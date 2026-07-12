"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeMeterType } from "@/types/change-meter";
import InputField from "../../../../common/components/form-field-components/input-field";
import {
  Calendar,
  Zap,
  User,
  Undo2,
  Cpu,
  Hash,
  Binary,
  Tag,
  NotebookPen,
  MapPinned,
} from "lucide-react";
import FormButton from "../../../../common/components/form-button";
import SubmitCompletion from "../../../../common/components/submit-completion";
import CoordinatesField from "../../../../common/components/form-field-components/coordinates-field";
import ImageField from "../../../../common/components/form-field-components/image-field";
import { getDB } from "../../../../../lib/db";

const EntryForm = () => {
  const [uuid, setUuid] = useState("");
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);

  // GENERATE UUID ON INTIAL LOAD
  useEffect(() => {
    const SetUUID = async () => {
      const uuid = crypto.randomUUID();
      setUuid(uuid);
    };
    SetUUID();
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
    reset
  } = useForm<ChangeMeterType>({ mode: "all", shouldUnregister: false });

  const handleReturn = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onSubmit: SubmitHandler<ChangeMeterType> = async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("change_meters", "readwrite");
      const store = transaction.objectStore("change_meters");
      await store.put({
        ...data,
        uuid: uuid,
        is_synced: false,
        is_deleted: false,
        datetime_synced: null,
        datetime_deleted: null,
      });
      await transaction.done;
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLE NEW ENTRY
  const handleNewEntry = () => {
    setSuccess(false);
    setStep(0);
    reset();
    setUuid(crypto.randomUUID());
  }
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
        <h3 className="text-lg font-bold">Change Meter Entry</h3>
      </div>
      {success ? (
        <SubmitCompletion onNewEntry={handleNewEntry} returnPath={`/menu/change-meter`} />
      ) : (
        <>
          {step === 0 && (
            <>
              {/* DATE ACCOMPLISHED */}
              <InputField
                inputType="date"
                required={true}
                Icon={Calendar}
                name="date_accomplished"
                register={register}
                label="Date Accomplished"
                error={errors.date_accomplished?.message}
              />

              {/* ACCOUNT NUMBER */}
              <InputField
                inputType="text"
                pattern={/^\d{10}$/}
                patternMessage="Please enter a valid 10 digit account number"
                required={true}
                Icon={Zap}
                name="account_no"
                register={register}
                label="Account Number"
                error={errors.account_no?.message}
              />

              {/* CONSUMERS NAME */}
              <InputField
                required={true}
                Icon={User}
                name="consumer_name"
                register={register}
                label="Consumer Name"
                error={errors.consumer_name?.message}
              />
            </>
          )}
          {step === 1 && (
            <>
              {/* PULL OUT METER BRAND */}
              <InputField
                required={true}
                inputType="text"
                name="pull_out_meter"
                label="Pull Out Meter Brand"
                register={register}
                Icon={Cpu}
                error={errors.pull_out_meter?.message}
              />

              {/* PULL OUT METER SERIAL NUMBER */}
              <InputField
                required={true}
                inputType="text"
                name="pull_out_meter_serial_no"
                label="Pull Out Meter Serial Number"
                register={register}
                Icon={Hash}
                error={errors.pull_out_meter_serial_no?.message}
              />

              <InputField
                register={register}
                Icon={Binary}
                required={true}
                inputType="number"
                name="pull_out_reading"
                label="Pull Out Meter Reading"
                error={errors.pull_out_reading?.message}
              />
            </>
          )}
          {step === 2 && (
            <>
              {/* NEW METER BRAND */}
              <InputField
                required={true}
                register={register}
                name="new_meter_brand"
                label="New Meter Brand"
                Icon={Cpu}
                error={errors.new_meter_brand?.message}
              />
              {/* NEW METER SERIAL NUMBER */}
              <InputField
                required={true}
                register={register}
                name="new_meter_serial_no"
                label="New Meter Serial Number"
                Icon={Hash}
                error={errors.new_meter_serial_no?.message}
              />

              {/* METER SEALED */}
              <InputField
                required={false}
                register={register}
                name="meter_sealed"
                label="Meter Sealed"
                Icon={Tag}
                error={errors.meter_sealed?.message}
              />
              {/* INITIAL READING */}

              <InputField
                required={true}
                register={register}
                name="initial_reading"
                label="Initial Reading"
                Icon={Binary}
                error={errors.meter_sealed?.message}
              />
            </>
          )}

          {step === 3 && (
            <>
              {/* ACCOMPLISHED BY */}

              <InputField
                required={true}
                register={register}
                name="accomplished_by"
                label="Accomplished By"
                Icon={User}
                error={errors.accomplished_by?.message}
              />
              <InputField
                register={register}
                required={false}
                name="remarks"
                label="Remarks"
                Icon={NotebookPen}
              />
            </>
          )}
          {
            // COORDINATES
            step === 4 && (
              <CoordinatesField
                setValue={setValue}
                control={control}
                register={register}
                Icon={MapPinned}
                latitudeError={errors.lat?.message}
              />
            )
          }

          {step === 5 && (
            <ImageField
              control={control}
              error={errors.image?.message}
            />
          )}
          <FormButton maxStep={5} step={step} setStep={setStep} isValid={isValid} />
        </>
      )}

      
    </form>
  );
};

export default EntryForm;
