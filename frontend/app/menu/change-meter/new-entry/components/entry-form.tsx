"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewConnectionType } from "@/types/new-connection";
import InputField from "../../../../common/components/form-field-components/input-field";
import { Zap, User, Undo2 } from "lucide-react";
import DateField from "../../../../common/components/form-field-components/date-field";
import FormButton from "../../../../common/components/form-button";
import SubmitCompletion from "../../../../common/components/submit-completion";
const EntryForm = () => {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<NewConnectionType>({ mode: "all", shouldUnregister: false });

  const handleReturn = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onSubmit: SubmitHandler<NewConnectionType> = async (data) => {};
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
        <SubmitCompletion returnPath={`/menu/new-connection`} />
      ) : (
        <>
          {step === 0 && (
            <>
              {/* DATE ACCOMPLISHED */}
              <DateField
                register={register}
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
        </>
      )}

      <FormButton maxStep={2} step={step} setStep={setStep} isValid={isValid} />
    </form>
  );
};

export default EntryForm;
