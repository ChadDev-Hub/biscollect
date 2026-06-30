"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  maxStep: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isValid: boolean;
};

const FormButton = ({ maxStep, step, setStep, isValid }: Props) => {
  const handleNextStep = () => {
    if (step < maxStep) {
      setStep(step + 1);
    }
  };
  return (
    <>
      {step < 5 ? (
        <button
          disabled={!isValid}
          type="button"
          className="btn btn-primary"
          onClick={handleNextStep}
        >
          Next
        </button>
      ) : (
        <button 
        disabled={!isValid} 
        type="submit" 
        className="btn btn-primary">
          Submit
        </button>
      )}
    </>
  );
};

export default FormButton;
