"use client";

import {  useWatch, Control, Controller, FieldValues, Path } from "react-hook-form";
import { Image as LucideImage } from "lucide-react";
import Image from "next/image";

type Props<T extends FieldValues> = {
  control: Control<T>;
  error?: string;
  maxStep?: number;
  step?: number;
};

const ImageField =<T extends FieldValues> ({  control, error, maxStep, step }: Props<T>) => {
  const image = useWatch({ name: "image" as Path<T>, control: control });

  return (
    <section className={`flex flex-col w-full gap-2 items-center justify-center ${step === maxStep ? "block" : "hidden"}`}>
      <label className="cursor-pointer   text-slate-300/45">
      <Controller
          name={"image" as Path<T>}
          control={control}
          rules={{required: {value: true, message: "Image is Required"}}}
          render={({ field }) => (
            <input
              onChange={(e)=>field.onChange(e.target.files?.[0] ?? null)}
              type="file"
              accept="image/*"
              className="hidden"
            />
          )}
        />
        
        
        <div className="relative bg-base-200 ring-2 ring-amber-300  w-40 h-40 rounded-full overflow-hidden border-info border-dashed border-2  ">
          <LucideImage className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6" />
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="image"
              fill
              className="object-cover hover:scale-105 transition-all duration-300 ease-in-out"
            />
          )}
        </div>
      </label>
      <p>
        {error && <span className="text-red-500 italic text-xs">{error}</span>}
      </p>
    </section>
  );
};

export default ImageField;
