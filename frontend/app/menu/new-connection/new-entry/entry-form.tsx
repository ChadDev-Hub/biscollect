"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../../../common/components/form-field-components/input-field";
import { NewConnectionType } from "@/types/new-connection";
import CoordinatesField from "../../../common/components/form-field-components/coordinates-field";
import ImageField from "@/app/common/components/form-field-components/image-field";
import { useState, useEffect } from "react";
import { Undo2 } from "lucide-react";
import { getDB } from "@/lib/db";
import FormButton from "../../../common/components/form-button";
import DateField from "../../../common/components/form-field-components/date-field";
import {
  User,
  Hash,
  Cpu,
  Tag,
  Binary,
  Asterisk,
  NotebookPen,
  MapPinned,
} from "lucide-react";
import SubmitCompletion from "../../../common/components/submit-completion";

const EntryForm = () => {
  const [step, setStep] = useState(0);
  const [uniqueid, setUniqueid] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setUniqueid(crypto.randomUUID()));
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
  } = useForm<NewConnectionType>({ mode: "all", shouldUnregister: false });

  const onSubmit: SubmitHandler<NewConnectionType> = async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("new_connections", "readwrite");
      const store = transaction.objectStore("new_connections");
      await store.put({
        uuid: uniqueid,
        ...data,
        is_synced: false,
      });

      await transaction.done;
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter" && step < 5) e.preventDefault();
      }}
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
        <h3 className="text-lg font-bold">New Connection Entry</h3>
      </div>
      {success ? (
        <SubmitCompletion returnPath={`/menu/new-connection`} />
      ) : (
        <>
          {/* Consumer Name */}
          {step === 0 && (
            <>
              <DateField register={register} />
              <InputField
                Icon={User}
                name="consumer_name"
                register={register}
                label="Consumer Name"
                required={true}
                error={errors.consumer_name?.message}
              />
            </>
          )}

          {step === 1 && (
            <>
              <InputField
                Icon={Hash}
                name="meter_serial_no"
                register={register}
                label="Meter Serial Number"
                required={true}
                error={errors.meter_serial_no?.message}
              />

              <InputField
                Icon={Cpu}
                name="meter_brand"
                register={register}
                label="Meter Brand"
                required={true}
                error={errors.meter_brand?.message}
              />

              <InputField
                Icon={Tag}
                name="meter_sealed"
                register={register}
                label="Meter Sealed"
                required={true}
                error={errors.meter_sealed?.message}
              />
            </>
          )}

          {/* Initial Reading */}
          {step === 2 && (
            <>
              <InputField
                Icon={Binary}
                name="initial_reading"
                register={register}
                label="Initial Reading"
                required={true}
                error={errors.initial_reading?.message}
                inputType="number"
              />

              <InputField
                Icon={Asterisk}
                name="multiplier"
                register={register}
                label="Multiplier"
                required={true}
                error={errors.multiplier?.message}
                inputType="number"
              />
            </>
          )}

          {/* ACCOMPLISHED BY */}
          {step === 3 && (
            <>
              <InputField
                Icon={User}
                name="accomplished_by"
                register={register}
                label="Accomplished By"
                required={true}
                error={errors.accomplished_by?.message}
              />

              <InputField
                Icon={NotebookPen}
                name="remarks"
                register={register}
                label="Remarks"
                required={false}
              />
            </>
          )}

          {/* REMARKS */}

          {/* COORDINATES */}
          {step === 4 && (
            <CoordinatesField
              Icon={MapPinned}
              register={register}
              setValue={setValue}
              control={control}
              latitudeError={errors.latitude?.message}
            />
          )}

          {/* IMAGE FIELD */}
          {step === 5 && (
            <ImageField control={control} error={errors.image?.message} />
          )}

          {/* SUBMIT BUTTON */}

          <FormButton
            maxStep={5}
            step={step}
            setStep={setStep}
            isValid={isValid}
          />
        </>
      )}
    </form>
  );
};

export default EntryForm;
