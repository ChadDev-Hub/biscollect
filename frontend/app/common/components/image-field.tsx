"use client";

import { UseFormRegister, useWatch, Control } from "react-hook-form";
import { NewConnectionType } from "@/types/new-connection";
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
      <label className="cursor-pointer">
        <input
          {...register("image")}
          type="file"
          accept="image/*"
          className="hidden"
        />
        <div className="relative bg-base-200 ring-2 ring-amber-300  w-40 h-40 rounded-full overflow-hidden border-info border-dashed border-2">
          {image && (
            <Image
              src={URL.createObjectURL(file) ?? ""}
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
