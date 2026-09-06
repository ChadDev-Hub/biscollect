"use client";

import { UseFormRegister, FieldPath, FieldValues, SetFieldValue, Path, PathValue } from "react-hook-form";
import { LucideIcon } from "lucide-react";
import { Feature } from "@/types/geojson";
import {Dispatch, SetStateAction} from "react";
type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required: boolean;
  error?: string;
  inputType?: "text" | "number" | "date";
  Icon?: LucideIcon;
  maxStep?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  isDisabled?: boolean;
  listOptionId?: string;
  listOption?: string[];
  consumerLisOption?: Feature[];
  setConsumerOption?: Dispatch<SetStateAction<Feature[] | []>>
  hidden?: boolean;
  setValue?: SetFieldValue<T>;
};

const InputField = <T extends FieldValues>({
  name,
  register,
  label,
  required,
  error,
  inputType,
  Icon,
  maxStep,
  step,
  minLength,
  maxLength,
  pattern,
  patternMessage,
  isDisabled,
  setValue,
  hidden,
  consumerLisOption,
  setConsumerOption
}: Props<T>) => {
  const handleSelectedConsumter = (feature: Feature) => {
    if (!setValue) return;
    
    setValue("consumer_name" as Path<T> , feature.properties.account_name as PathValue<T,Path<T>> , {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
     

    setValue("account_no" as Path<T> , feature.properties.account_no as PathValue<T,Path<T>> , {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });


    setValue("pull_out_meter" as Path<T> , feature.properties.meter_brand as PathValue<T,Path<T>> , {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

    setValue("pull_out_meter_serial_no" as Path<T> , feature.properties.meter_no as PathValue<T,Path<T>> , {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    setConsumerOption?.([]);
  }
  return (
    <section
      className={`w-full  flex flex-col  gap-2 ${maxStep === step ? "block" : "hidden"}`}
    >
      <label className="label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>
      <div className="relative">
        <label className="input w-full px-1">
          <div className="py-2">
            <div className="bg-base-200 p-2 rounded-full">
              {Icon && <Icon className="text-primary size-4" />}
            </div>
          </div>

          <input
            disabled={isDisabled}
            hidden={hidden}
            {...register(name, {
              required: { value: required, message: `${label} is Required` },
              ...(minLength && {
                minLength: {
                  value: minLength,
                  message: `${label} must be at least ${minLength} characters long`,
                },
              }),
              ...(maxLength && {
                maxLength: {
                  value: maxLength,
                  message: `${label} must be at most ${maxLength} characters long`,
                },
              }),
              ...(pattern && {
                pattern: {
                  value: pattern,
                  message: `${patternMessage}`,
                },
              }),
            })}
            type={inputType || "text"}
            className="grow "
          />
        </label>
        {
          <ul className="absolute rounded list list-sm top-full mt-3 left-0 max-h-32 z-99999 w-full overflow-y-auto bg-base-300 ">
            {consumerLisOption &&
              consumerLisOption.map((item: Feature, index: number) => (
                <li onClick={() => handleSelectedConsumter(item)} className="list-row hover:bg-base-200 text-[10px]  hover:cursor-pointer list-xs z-100" key={index}>
                  {item.properties.account_no} | {item.properties.account_name} 
                </li>
              ))}
          </ul>
        }
      </div>

      {error && <span className="text-red-500 italic text-xs">{error}</span>}
    </section>
  );
};

export default InputField;
