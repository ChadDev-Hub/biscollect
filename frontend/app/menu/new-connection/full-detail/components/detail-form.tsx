"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { getDB } from "@/lib/db";
import { useEffect, useState } from "react";
import { NewConnectionType } from "../../../../../types/new-connection";
import InputField from "../../../../common/components/form-field-components/input-field";

import {
  Calendar,
  User,
  Cpu,
  Hash,
  Binary,
  Tag,
  Asterisk,
  NotebookPen,
  MapPinned,
} from "lucide-react";
import EditButton from "../../../../common/components/edit-button";
import CoordinatesField from '../../../../common/components/form-field-components/coordinates-field';
import ImageField from "@/app/common/components/form-field-components/image-field";
type Props = {
  uuid: string;
};

const DetailForm = ({ uuid }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm<NewConnectionType>({ mode: "all", shouldUnregister: false });
  useEffect(() => {
    const getEntry = async () => {
      const idb = await getDB();
      const transaction = idb.transaction("new_connections", "readwrite");
      const store = transaction.objectStore("new_connections");
      const index = store.index("uuid");
      const result = await index.get(uuid);
      reset(result);
    };
    getEntry();
  }, [reset, uuid]);


  const onSubmit:SubmitHandler<NewConnectionType> = async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("new_connections", "readwrite");
      const store = transaction.objectStore("new_connections");
      await store.put({
        ...data,
        is_synced: false,
      });
      await transaction.done;
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full flex-col gap-2 bg-base-100 rounded-box p-4">
      <EditButton is_editing={editMode} setIsEditing={setEditMode} />
      {/* DATE ACCOMPLISHED */}
      <InputField
        name="date_accomplished"
        error={errors.date_accomplished?.message}
        required={true}
        Icon={Calendar}
        inputType="date"
        label="Date Accomplished"
        register={register}
        isDisabled={!editMode}
      />
      {/* CONSUMER NAME */}
      <InputField
        Icon={User}
        name="consumer_name"
        error={errors.consumer_name?.message}
        required={true}
        label="Consumer Name"
        register={register}
        isDisabled={!editMode}
      />

      <div className="grid grid-cols-2 gap-2">
        {/* METER BRAND */}
        <InputField
          register={register}
          name="meter_brand"
          error={errors.meter_brand?.message}
          required={true}
          Icon={Cpu}
          label="Meter Brand"
          isDisabled={!editMode}
        />
        {/* METER SERIAL NO. */}
        <InputField
          register={register}
          name="meter_serial_no"
          error={errors.meter_serial_no?.message}
          required={true}
          Icon={Hash}
          label="Meter Serial No."
          isDisabled={!editMode}
        />
      </div>
      {/* Meter Sealed */}
      <InputField
        register={register}
        name="meter_sealed"
        error={errors.meter_sealed?.message}
        required={true}
        Icon={Binary}
        label="Meter Sealed"
        isDisabled={!editMode}
      />
      {/* METER SEALED */}
      <InputField
        register={register}
        name="meter_sealed"
        error={errors.initial_reading?.message}
        required={false}
        Icon={Tag}
        label="Meter Sealed"
        isDisabled={!editMode}
      />

      <div className="grid grid-cols-2 gap-2">
        {/* INITIAL READING */}
        <InputField
          register={register}
          inputType="number"
          name="initial_reading"
          error={errors.initial_reading?.message}
          required={true}
          Icon={Binary}
          label="Initial Reading"
          isDisabled={!editMode}
        />

        {/* MULTIPLIER */}
        <InputField
          register={register}
          inputType="number"
          name="multiplier"
          error={errors.multiplier?.message}
          required={true}
          Icon={Asterisk}
          label="Multiplier"
          isDisabled={!editMode}
        />
      </div>
      {/* ACCOMPLISHED BY */}
      <InputField
        register={register}
        name="accomplished_by"
        error={errors.accomplished_by?.message}
        required={true}
        Icon={User}
        label="Accomplished By"
        isDisabled={!editMode}
      />
      {/* REMARKS */}
      <InputField
        register={register}
        name="remarks"
        error={errors.remarks?.message}
        required={false}
        Icon={NotebookPen}
        label="Remarks"
        isDisabled={!editMode}
      />

      {/* COORDINATES */}
      <CoordinatesField
        register={register}
        control={control}
        setValue={setValue}
        Icon={MapPinned}
        is_disabled={!editMode}
      />

      {/* IMAGE */}
      <ImageField
        control={control}
        error={errors.image?.message}
        is_disabled={!editMode}
      />

      <button disabled={!editMode} type="submit" className="w-full btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default DetailForm;
