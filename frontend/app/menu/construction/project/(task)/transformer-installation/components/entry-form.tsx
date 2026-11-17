"use client";
import { useState, useEffect} from "react";
import { useForm, useWatch, SubmitHandler} from "react-hook-form";
import { Calendar, MapPin, Zap } from "lucide-react";
import ImageField from "@/app/common/components/form-field-components/image-field";
import InputField from "@/app/common/components/form-field-components/input-field";
import SelectInputField from "@/app/common/components/form-field-components/select-input-field";
import CheckBoxFieldOption from "@/app/common/components/form-field-components/radio-input-field";
import FormButton from "@/app/common/components/buttons/form-button";
import type {TransformerInstallation} from "@/types/transformer";
import {fetchTransformerType, AddTransformertoDb} from "@/app/menu/construction/project/components/constructionTaskSlice";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PhasingOptions } from '@/lib/phasing';
import CoordinatesField from "@/app/common/components/form-field-components/coordinates-field";
import { useSearchParams } from 'next/navigation';


const EntryForm = () => {
  const transformerType = useAppSelector((state) => state.constructionTask.transformer_type);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const  {register,formState:{isValid, errors},control, setValue, handleSubmit, reset} = useForm<TransformerInstallation>(
    {
      defaultValues:{
        task: "Transformer Installation",
      }
    }
  );
  const params = useSearchParams();
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


  const onSubmit:SubmitHandler<TransformerInstallation> = async (data) => {
    try {
      const newData: TransformerInstallation = {
        
        ...data,
        uuid: crypto.randomUUID(),
        cuuid: params.get("cuuid") || "",
        is_synced: false,
      }
      dispatch(AddTransformertoDb(newData));
      setSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        name="transformer_type"
        label="Transformer Type"
        options={transformerType}
        required
        valueasNumber
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
       control={control} Icon={MapPin} latitudeError={errors.lat?.message} />
       

       {/* IMAGE */}
        <ImageField
        control={control} error={errors.image?.message}
        /> 
      <FormButton isValid={isValid} />
    </form>
  );
};

export default EntryForm;
