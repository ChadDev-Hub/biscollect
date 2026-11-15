"use client";
import { useState, useEffect} from "react";
import { useForm, useWatch} from "react-hook-form";
import { Calendar, Undo2, Zap } from "lucide-react";
import InputField from "@/app/common/components/form-field-components/input-field";
import SelectInputField from "@/app/common/components/form-field-components/select-input-field";
import CheckBoxFieldOption from "@/app/common/components/form-field-components/radio-input-field";
import FormButton from "@/app/common/components/buttons/form-button";
import SubmitCompletion from "@/app/common/components/submit-completion";
import TextAreaField from "@/app/common/components/form-field-components/text-area-field";
import type {TransformerInstallation, TransformerType} from "@/types/transformer";
import {fetchTransformerType} from "@/app/menu/construction/project/components/constructionTaskSlice";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PhasingOptions } from '@/lib/phasing';
import CoordinatesField from "@/app/common/components/form-field-components/coordinates-field";


const EntryForm = () => {
  const transformerType = useAppSelector((state) => state.constructionTask.transformer_type);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const  {register,formState:{isValid, errors},control, setValue} = useForm<TransformerInstallation>();
  
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    const fetchData = async () => {
      dispatch(fetchTransformerType());
    };
    fetchData();
  },[dispatch]);
  
  const useType = useWatch({
    control,
    name: "use_type",
  });

  const phasing = useWatch({
    control,
    name: "phasing",
  })
  return (
    <form
      className="flex   flex-col p-4 gap-4 bg-base-200 card w-full max-w-lg shadow-md"
    >
      <InputField
        register={register}
        name="date"
        label="Date"
        required
        inputType="date"
        Icon={Calendar}
      />

      <SelectInputField
        register={register}
        name="transformer_type_id"
        label="Transformer Type"
        options={transformerType}
        required
        Icon={Zap}
      />
      

      <CheckBoxFieldOption
        name="use_type"
        register={register}
        label="Usage Type"
        options={['Sole','Distribution']}
        className="flex gap-2 flex-row w-full justify-between"
        selected={useType}
        required
      />


      <CheckBoxFieldOption
        name="phasing"
        register={register}
        label="Phasing"
        options={PhasingOptions}
        className="grid grid-cols-3 gap-2"
        selected={phasing}
        required
      />

      <CoordinatesField 
      register={register}
      setValue={setValue}
       control={control} Icon={Undo2} latitudeError={errors.lat?.message} />
       
      
      <FormButton step={step} setStep={setStep} maxStep={4} isValid={isValid} />
    </form>
  );
};

export default EntryForm;
