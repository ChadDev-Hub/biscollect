"use client";
import {
  UseFormRegister,
  UseFormSetValue,
  useWatch,
  Control,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { LocateFixed } from "lucide-react";
import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";



type Props<T extends FieldValues> ={
  Icon: LucideIcon;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  latitudeError?: string;
  control: Control<T>;
  is_disabled?: boolean
};

const CoordinatesField =<T extends FieldValues> ({
  register,
  setValue,
  latitudeError,
  control,
  Icon,
  is_disabled = false
}: Props<T>) => {
  const [islocating, setIslocating] = useState(false);
  const latWatch = useWatch({ name: "lat" as Path<T> , control: control });
  const lonWatch = useWatch({ name: "lon" as Path<T> , control: control });
  const handleGetLocation = () => {
    setIslocating(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude, accuracy } = position.coords;
     
      setValue("lat" as Path<T> , latitude as PathValue<T,Path<T>> , {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("lon" as Path<T>,  longitude as PathValue<T,Path<T>>, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }, () => {
      setIslocating(false)
      alert("Please alllow location access");
      ;
    },
    {
      enableHighAccuracy: true
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
    <section className={`flex flex-col gap-2 `}>
      <label htmlFor="" className="label font-bold">
        <span className="">Geolocation</span>
        <span className=" text-red-500">*</span>
      </label>
      <div className="w-full grid grid-cols-2 gap-2 place-items-center">
        <div className="flex flex-col gap-2">
          <label className="input">
            <Icon className="text-base-content size-6" />
            <input
              disabled={is_disabled}
              readOnly
              {...register("lat" as Path<T> , {
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
              disabled={is_disabled}
              readOnly
              {...register("lon" as Path<T>, {
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
          disabled={is_disabled}
          data-tip="Get Location"
          title="Get Location"
          onClick={handleGetLocation}
          type="button"
          className={`btn ${is_disabled ? "btn-disabled" : "bg-blue-600"} btn-circle  tooltip tooltip-left tooltip-info`}
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
