"use client";
import { NewConnectionType } from "@/types/new-connection";
import {
  UseFormRegister,
  UseFormSetValue,
  useWatch,
  Control,
} from "react-hook-form";
import { LocateFixed } from "lucide-react";
import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  register: UseFormRegister<NewConnectionType>;
  setValue: UseFormSetValue<NewConnectionType>;
  latitudeError?: string;
  control: Control<NewConnectionType>;
  maxStep?: number;
  step?: number;
};

const CoordinatesField = ({
  register,
  setValue,
  latitudeError,
  control,
  Icon,
  maxStep,
  step,
}: Props) => {
  const [islocating, setIslocating] = useState(false);
  const latWatch = useWatch({ name: "latitude", control: control });
  const lonWatch = useWatch({ name: "longitude", control: control });
  const handleGetLocation = () => {
    setIslocating(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setValue("latitude", latitude, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("longitude", longitude, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    });
  };
  useEffect(() => {
    if (latWatch && lonWatch) {
      queueMicrotask(() => {
        setIslocating(false);
      });
    }
  }, [latWatch, lonWatch]);
  return (
    <section className={`flex flex-col gap-2 ${maxStep === step ? "block" : "hidden"}`}>
      <label htmlFor="" className="label font-bold">
        <span className="">Geolocation</span>
        <span className=" text-red-500">*</span>
      </label>
      <div className="w-full grid grid-cols-2 gap-2 place-items-center">
        <div className="flex flex-col gap-2">
          <label className="input">
            <Icon className="text-base-content size-6" />
            <input
              readOnly
              {...register("latitude", {
                required: { value: true, message: "Latitude is Required" },
              })}
              type="number"
              placeholder="Latitude"
              className="grow w-full"
            />
          </label>
          <label className="input w-full">
            <Icon className="text-base-content size-6" />
            <input
              readOnly
              {...register("longitude", {
                required: { value: true, message: "Longitude is Required" },
              })}
              type="number"
              placeholder="Longitude"
              className="grow"
            />
          </label>
          {latitudeError && (
            <span className="text-red-500 italic text-xs">{latitudeError}</span>
          )}
        </div>

        <button
          data-tip="Get Location"
          title="Get Location"
          onClick={handleGetLocation}
          type="button"
          className="btn btn-primary btn-circle bg-blue-700 tooltip tooltip-left tooltip-info"
        >
          <LocateFixed
            className={`text-neutral-content ${islocating ? "animate-spin" : ""}`}
          />
        </button>
      </div>
    </section>
  );
};

export default CoordinatesField;
