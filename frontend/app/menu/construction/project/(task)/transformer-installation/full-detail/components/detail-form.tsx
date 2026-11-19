"use client";

import React, { useState, useEffect } from "react";
import EditButton from "@/app/common/components/buttons/edit-button";
import InputField from "@/app/common/components/form-field-components/input-field";
import { Calendar, MapPin, Zap } from "lucide-react";
import SelectInputField from "@/app/common/components/form-field-components/select-input-field";
import CheckBoxFieldOption from "@/app/common/components/form-field-components/radio-input-field";
import CoordinatesField from "@/app/common/components/form-field-components/coordinates-field";
import ImageField from "@/app/common/components/form-field-components/image-field";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchTransformerType } from "../../../../components/constructionTaskSlice";
import {
  editTransformerDetail,
  fetchTransformerDetail,
} from "../../../../components/constructionTaskSlice";
import { TransformerInstallation } from "@/types/transformer";
import { PhasingOptions } from "@/lib/phasing";
const TransformerDetailForm = () => {
  const [editing, setEditing] = useState(false);
  const params = useSearchParams();
  const transformerType = useAppSelector(
    (state) => state.constructionTask.transformer_type,
  );
  const uuid = params.get("uuid") || "";
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { isValid, errors },
    control,
    setValue,
    handleSubmit,
    reset,
  } = useForm<TransformerInstallation>({
    mode: "all",
    shouldUnregister: false,
    defaultValues: {
      task: "Transformer Installation",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchTransformerDetail(uuid)).unwrap();
      reset(result);
      dispatch(fetchTransformerType());
    };
    fetchData();
  },[dispatch, reset, uuid]);

  const useType = useWatch({
    control,
    name: "use_type",
  });

  const phasing = useWatch({
    control,
    name: "phasing",
  });
  const onSubmit: SubmitHandler<TransformerInstallation> = async (data) => {
    try {
      const newData: TransformerInstallation = {
        ...data,
        is_synced: false,
      };
      dispatch(editTransformerDetail(newData));
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 relative bg-base-100 p-4 max-w-md rounded-box"
    >
      <EditButton is_editing={editing} setIsEditing={setEditing} />

      <InputField
        isDisabled={!editing}
        register={register}
        name="date"
        label="Date"
        required
        inputType="date"
        Icon={Calendar}
      />

      <SelectInputField
        disabled={!editing}
        register={register}
        name="transformer_type"
        label="Transformer Type"
        options={transformerType}
        required
        valueasNumber
        Icon={Zap}
      />

      <CheckBoxFieldOption
        isDisabled={!editing}
        name="use_type"
        register={register}
        label="Usage Type"
        options={["Sole", "Distribution"]}
        className="flex gap-2 flex-row w-full justify-between"
        selected={useType}
        required
      />

      <CheckBoxFieldOption
        isDisabled={!editing}
        name="phasing"
        register={register}
        label="Phasing"
        options={PhasingOptions}
        className="grid grid-cols-3 gap-2"
        selected={phasing}
        required
      />

      <CoordinatesField
        is_disabled={!editing}
        register={register}
        setValue={setValue}
        control={control}
        Icon={MapPin}
        latitudeError={errors.lat?.message}
      />

      {/* IMAGE */}
      <ImageField is_disabled={!editing} control={control} error={errors.image?.message} />

      <button
        disabled={!isValid}
        type="submit"
        className={`btn btn-primary ${!isValid && "btn-disabled"}`}
      >
        Submit
      </button>
    </form>
  );
};

export default TransformerDetailForm;
