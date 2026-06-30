"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "./input-field";
import { NewConnectionType } from "@/types/new-connection";
import CoordinatesField from "./coordinates-field";
import ImageField from "@/app/common/components/image-field";
import { useState, useEffect } from "react";
import { Undo2 } from "lucide-react";
import {db} from "@/lib/db";
const EntryForm = () => {
  const [step, setStep] = useState(0);
  const [uniqueid, setUniqueid] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setUniqueid(crypto.randomUUID()))
  },[])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
  } = useForm<NewConnectionType>({ mode: "all" });


  
  const onSubmit: SubmitHandler<NewConnectionType> = async(data) => {
    const transaction = (await db).transaction("new_connections", "readwrite");
    const store = transaction.objectStore("new_connections");
    const result = await store.put({
      uuid: uniqueid,
      ...data
    })
    if (result == uniqueid) {
      setSuccess(true);
    }
  };

  const handleReturn = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-4 gap-4 bg-base-200 card w-full max-w-lg shadow-md"
    >
      <label className="flex items-center justify-between gap-2">
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
      </label>

      {/* Consumer Name */}
      {step === 0 && (
        <>
          <InputField
            name="consumer_name"
            register={register}
            label="Consumer Name"
            required={true}
            error={errors.consumer_name?.message}
          />

          <InputField
            name="meter_serial_no"
            register={register}
            label="Meter Serial Number"
            required={true}
            error={errors.meter_serial_no?.message}
          />
        </>
      )}

      {step === 1 && (
        <>
          <InputField
            name="meter_brand"
            register={register}
            label="Meter Brand"
            required={true}
            error={errors.meter_brand?.message}
          />

          <InputField
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
            name="initial_reading"
            register={register}
            label="Initial Reading"
            required={true}
            error={errors.initial_reading?.message}
            inputType="number"
          />

          <InputField
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
            name="accomplished_by"
            register={register}
            label="Accomplished By"
            required={true}
            error={errors.accomplished_by?.message}
          />

          <InputField
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
          register={register}
          setValue={setValue}
          control={control}
          latitudeError={errors.latitude?.message}
        />
      )}

      {/* IMAGE FIELD */}
      {step === 5 && <ImageField register={register} control={control} />}
      {step < 5 ? (
        <button
          disabled={!isValid}
          type="button"
          className="btn btn-primary"
          onClick={() => setStep(step + 1)}
        >
          Next
        </button>
      ) : (
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      )}
    </form>
  );
};

export default EntryForm;
