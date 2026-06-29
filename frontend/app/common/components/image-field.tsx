"use client";

import { UseFormRegister, useWatch, Control } from "react-hook-form";
import { NewConnectionType } from "@/types/new-connection";
import { Image as LucideImage } from "lucide-react";
import Image from "next/image";

type Props = {
  register: UseFormRegister<NewConnectionType>;
  control: Control<NewConnectionType>;
};

const ImageField = ({ register, control }: Props) => {
  const image = useWatch({ name: "image", control: control });
  const file = image?.[0];
  return (
    <section className="flex flex-col w-full gap-2 items-center justify-center">
      <label className="cursor-pointer   text-slate-300/45">
        <input
          {...register("image")}
          type="file"
          accept="image/*"
          className="hidden"
        />
        
        <div className="relative bg-base-200 ring-2 ring-amber-300  w-40 h-40 rounded-full overflow-hidden border-info border-dashed border-2  ">
          <LucideImage className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6" />
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="image"
              fill
              className="object-cover hover:scale-105 transition-all duration-300 ease-in-out"
            />
          )}
        </div>
      </label>
    </section>
  );
};

export default ImageField;
