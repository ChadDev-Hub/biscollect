"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import InputField from "../../../../../common/components/form-field-components/input-field";
import { UtilityPole, Calendar, MapPin, Undo2, Workflow, LineSquiggle} from "lucide-react";
import { LineConstructionType } from "@/types/construction";
import CheckBoxFieldOption from "../../../../../common/components/form-field-components/radio-input-field";
import SelectInputField from "../../../../../common/components/form-field-components/select-input-field";
import CoordinatesField from "@/app/common/components/form-field-components/coordinates-field";
import ImageField from "@/app/common/components/form-field-components/image-field";
const constuctionType = ["Line Extension", "New Line"];
const LineType = ["Primary", "Secondary", "Underbuilt"];
const Phasing = ["AN", "BN", "CN", "ABCN", "BCN", "ACN", "ABN", "BAN", "CAN"];
import FormButton from "../../../../../common/components/buttons/form-button";
import SubmitCompletion from "../../../../../common/components/submit-completion";
import TextAreaField from "../../../../../common/components/form-field-components/text-area-field";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";

import { useSearchParams } from 'next/navigation';
import { fetchConductorData, fetchNeutralData, AddContructionLinetoDb,  addLineConstruction} from '../../components/constructionTaskSlice';
const LineConstrucitonEntryForm = () => {
  const {
    reset,
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    setValue,
  } = useForm<LineConstructionType>({
    mode: "all",
    shouldUnregister: false,
    defaultValues: {
      activity: "Line Construction",
    },
  });

  const [step, setStep] = useState(0);
  const params = useSearchParams();
  const cuuid = params.get("cuuid");
  const conductors = useAppSelector((state) => state.constructionTask.conductor);
  const neutral = useAppSelector((state) => state.constructionTask.neutral);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const handleReturn = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // EFFECT THAT GET THE CONDUCTOR DATA
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchConductorData());
      dispatch(fetchNeutralData());
    };
    fetchData();
  }, [dispatch]);

  //   WATCH INPUTS
  const lineType = useWatch({
    control: control,
    name: "line_type",
  });
  const PhasingInput = useWatch({
    control: control,
    name: "phasing",
  });

  const onSubmit: SubmitHandler<LineConstructionType> = async (data) => {
    const cleanedData: LineConstructionType ={
      ...data,
      cuuid: cuuid || "",
      uuid: crypto.randomUUID(),
      is_synced: false,
      is_deleted: false,
      datetime_synced: undefined,
      datetime_deleted: undefined,
      pct_acc: 0,
    }
    dispatch(addLineConstruction(cleanedData));
    dispatch(AddContructionLinetoDb(cleanedData));
    setSuccess(true);
    reset();
  };

  // HANDLE NEW ENTRY
  const handleNewEntry = () => {
    setSuccess(false);
    setStep(0);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-4 gap-4 bg-base-200 card w-full max-w-lg shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <button
          disabled={step === 0}
          onClick={handleReturn}
          title="return"
          type="button"
          className="btn btn-ghost"
        >
          <Undo2 className="size-6" />
        </button>
        <h3 className="text-lg font-bold">Line Construction</h3>
      </div>
      {success ? (
        <SubmitCompletion
          returnPath={`/menu/construction/project?cuuid=${cuuid}`}
          onNewEntry={handleNewEntry}
        />
      ) : (
        <>
          {step === 0 && (
            <>
              {/* ACTIVITY */}
              <input type="hidden" {...register("activity")} />

              {/* DATE ACCOMPLISHED */}

              <InputField
                Icon={Calendar}
                inputType="date"
                required={true}
                name="date_accomplished"
                label="Date Accomplished"
                register={register}
                error={errors.date_accomplished?.message}
              />

              {/* CONSTRUCTION TYPE */}
              <SelectInputField
                Icon={Workflow}
                name="type"
                register={register}
                label="Construction Type"
                required={true}
                options={constuctionType}
                error={errors.type?.message}
              />
              {/* INFORMATION */}
              <TextAreaField
                name="description"
                register={register}
                label="Description"
                required={false}
              />
            </>
          )}

          {step === 1 && (
            <>
              {/* LINE TYPE */}
              <CheckBoxFieldOption
                name="line_type"
                register={register}
                label="Line Type"
                required={true}
                options={LineType}
                error={errors.line_type?.message}
                selected={lineType}
                className="grid grid-cols-3 gap-2 w-full  place-items-center"
              />

              {/* PHASING */}
              <CheckBoxFieldOption
                className="grid grid-cols-3 gap-2 w-full  place-items-center"
                name="phasing"
                register={register}
                label="Phasing"
                required={true}
                options={Phasing}
                selected={PhasingInput}
                error={errors.phasing?.message}
              />

              {/* pole assembly */}
              {lineType === "Primary" && (
                <InputField
                  inputType="text"
                  required={false}
                  Icon={UtilityPole}
                  name="pole_assembly"
                  label="Pole Assembly"
                  register={register}
                />
              )}
            </>
          )}
          {step === 2 && (
            <>
              {/* CONDUCTOR */}
              <SelectInputField
                Icon={LineSquiggle}
                name="conductor"
                register={register}
                label="Conductor"
                required={true}
                options={conductors}
                error={errors.conductor?.message}
                valueasNumber={true}
              />

              {/* NEUTRAL WIRE TYPE */}
              <SelectInputField
                Icon={LineSquiggle}
                register={register}
                name="neutral"
                required={false}
                label="Neutral-Concentric Wire"
                options={neutral}
                valueasNumber={true}
              />
            </>
          )}
          {step === 3 && (
            <>
              {/* COORDINATES */}
              <CoordinatesField
                Icon={MapPin}
                register={register}
                setValue={setValue}
                latitudeError={errors.lat?.message}
                control={control}
              />
            </>
          )}
          {step === 4 && (
            <>
              {/* IMAGE FIELD */}
              <ImageField control={control} error={errors.image?.message} />
            </>
          )}
          <FormButton
            step={step}
            setStep={setStep}
            maxStep={4}
            isValid={isValid}
          />
        </>
      )}
    </form>
  );
};

export default LineConstrucitonEntryForm;
