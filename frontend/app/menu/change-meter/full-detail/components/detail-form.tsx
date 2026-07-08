"use client";
import { useEffect, useState } from "react";
import { getDB } from "@/lib/db";
import { ChangeMeterType } from "@/types/change-meter";
import { useForm, SubmitHandler } from "react-hook-form";
import { User, Zap, Calendar, Hash, Cpu, Binary, NotebookPen, MapPinned } from "lucide-react";
import InputField from "../../../../common/components/form-field-components/input-field";
import EditButton from "../../../../common/components/edit-button";
import CoordinatesField from '../../../../common/components/form-field-components/coordinates-field';
import ImageField from "@/app/common/components/form-field-components/image-field";
import { useRouter, useSearchParams } from 'next/navigation';



const DetailForm = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const {
    register,
    formState: { errors},
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm<ChangeMeterType>({ mode: "all", shouldUnregister: false });
  useEffect(() => {
    const getEntry = async () => {
      const idb = await getDB();
      const transaction = idb.transaction("change_meters", "readwrite");
      const store = transaction.objectStore("change_meters");
      const index = store.index("uuid");
      const result = await index.get(uuid ?? "");
      reset(result);
    };
    getEntry();
  }, [uuid, reset]);
  const onSubmit:SubmitHandler<ChangeMeterType> = async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("change_meters", "readwrite");
      const store = transaction.objectStore("change_meters");
      await store.put({
        ...data,
        is_synced: false},

      );
      await transaction.done;
      setEditMode(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full flex-col gap-2 bg-base-100 rounded-box p-4">
      <EditButton is_editing={editMode} setIsEditing={setEditMode} />

      {/* DATE ACCOMPLISHED */}
      <InputField
        register={register}
        required={true}
        name="date_accomplished"
        label="Date Accomplished"
        error={errors.date_accomplished?.message}
        inputType="date"
        Icon={Calendar}
        isDisabled={!editMode}
      />

      <div className="grid grid-cols-2 gap-2">
        {/* ACCOUNT NUMBER */}
        <InputField
          register={register}
          required={true}
          name="account_no"
          label="Account Number"
          error={errors.account_no?.message}
          inputType="text"
          Icon={Zap}
          isDisabled={!editMode}
        />

        {/*CONSUMER NAME INFO SECTION */}

        <InputField
          name="consumer_name"
          register={register}
          label="Consumer Name"
          required={true}
          error={errors.consumer_name?.message}
          inputType="text"
          Icon={User}
          isDisabled={!editMode}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* PULLOUT METER */}

        <InputField
          register={register}
          required={true}
          name="pull_out_meter"
          label="Pullout Meter"
          error={errors.pull_out_meter?.message}
          inputType="text"
          Icon={Cpu}
          isDisabled={!editMode}
        />
        {/* PULLOUT METER NUMBER */}
        <InputField
          register={register}
          required={true}
          name="pull_out_meter_serial_no"
          label="Pullout Meter SN."
          error={errors.pull_out_meter_serial_no?.message}
          inputType="text"
          Icon={Hash}
          isDisabled={!editMode}
        />
      </div>
      {/* PULLOUT READING */}
      <InputField
        register={register}
        required={true}
        name="pull_out_reading"
        label ="Pullout Reading"
        error={errors.pull_out_reading?.message}
        inputType="text"
        Icon={Binary}
        isDisabled={!editMode}
        />

      
      <div className="grid grid-cols-2 gap-2">
        {/* NEW METER  */}

        <InputField
          register={register}
          required={true}
          name="new_meter_brand"
          label="New Meter"
          error={errors.new_meter_brand?.message}
          inputType="text"
          Icon={Cpu}
          isDisabled={!editMode}
          />

        {/* NEW METER NUMBER  */}
        <InputField
          register={register}
          required={true}
          name="new_meter_serial_no"
          label="New Meter SN."
          error={errors.new_meter_serial_no?.message}
          inputType="text"
          Icon={Hash}
          isDisabled={!editMode}
          />
      </div>

      {/* INITIAL READING */}
      <InputField
        register={register}
        required={true}
        name="initial_reading"
        label="Initial Reading"
        error={errors.initial_reading?.message}
        inputType="text"
        Icon={Binary}
        isDisabled={!editMode}
      />

      {/* ACCOMPLISHED BY */}
      <InputField
        register={register}
        required={true}
        name="accomplished_by"
        label="Accomplished By"
        error={errors.accomplished_by?.message}
        inputType="text"
        Icon={User}
        isDisabled={!editMode}
      />

      {/* REMARKS */}
      <InputField
        register={register}
        required={false}
        name="remarks"
        label="Remarks"
        error={errors.remarks?.message}
        inputType="text"
        Icon={NotebookPen}
        isDisabled={!editMode}
      />


      {/* COORDINATES */}
      <CoordinatesField
        register={register}
        control={control}
        setValue={setValue}
        latitudeError={errors.lat?.message}
        Icon={MapPinned}
        is_disabled={!editMode}
      />
      
      {/* IMAGE */}
      <ImageField
        control={control}
        error={errors.image?.message}
        is_disabled={!editMode}
      />

      <button
        disabled={!editMode}
        type="submit"
        className="btn w-full btn-primary"
      >
        SAVE
      </button>
    </form>
  );
};

export default DetailForm;
