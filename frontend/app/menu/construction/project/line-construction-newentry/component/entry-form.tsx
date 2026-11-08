"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import InputField from "../../../../../common/components/form-field-components/input-field";
import { UtilityPole, Calendar, MapPin, Undo2 } from "lucide-react";
import { LineConstructionType } from "@/types/construction";
import { GetConductorName, GetNeutralName } from "@/lib/actions/conductor";
import { ConductorName } from "@/types/conductor-wire";
import CheckBoxFieldOption from "../../../../../common/components/form-field-components/radio-input-field";
import SelectInputField from "../../../../../common/components/form-field-components/select-input-field";
import CoordinatesField from "@/app/common/components/form-field-components/coordinates-field";
import ImageField from "@/app/common/components/form-field-components/image-field";
const constuctionType = ["Line Extension", "New Line"];
const LineType = ["Primary", "Secondary", "Underbuilt"];
const Phasing = ["AN", "BN", "CN", "ABCN", "BCN", "ACN", "ABN", "BAN", "CAN"];
import FormButton from "../../../../../common/components/form-button";
import SubmitCompletion from "../../../../../common/components/submit-completion";
import { DataCleaner } from "@/lib/data-cleaner";
import { getDB } from "../../../../../../lib/db";
import TextAreaField from "../../../../../common/components/form-field-components/text-area-field";
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

  const [conductors, setConductors] = useState<ConductorName[] | []>([]);
  const [neutral, setNeutral] = useState<ConductorName[] | []>([]);
  const [success, setSuccess] = useState(false);

  const handleReturn = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // EFFECT THAT GET THE CONDUCTOR DATA
  useEffect(() => {
    const getConductorData = async () => {
      const data = await GetConductorName();
      if (data) {
        setConductors(data);
      }
    };
    const getNeutralData = async () => {
      const data = await GetNeutralName();
      if (data) {
        setNeutral(data);
      }
    };
    getConductorData();
    getNeutralData();
  }, []);

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
    const cleanedData = DataCleaner({
      ...data,
      const_uuid: crypto.randomUUID(),
      uuid: crypto.randomUUID(),
      is_synced: false,
      is_deleted: false,
      datetime_synced: null,
      datetime_deleted: null,
    });
    const db = await getDB();
    const transaction = db.transaction("line_constructions", "readwrite");
    const store = transaction.objectStore("line_constructions");
    await store.put(cleanedData);
    await transaction.done;
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
          returnPath="/menu/construction/line-construction"
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
