"use client";
import { useEffect, useState } from "react";
import { getDB } from "@/lib/db";
import { ChangeMeterType } from "@/types/change-meter";
import { useForm } from "react-hook-form";
import { User, Zap, Calendar} from "lucide-react";
import InputField from "../../../../common/components/form-field-components/input-field";
import EditButton from "../../../../common/components/edit-button";
type Props = {
  uuid: string;
};

const DetailForm = ({ uuid }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    formState: { errors, isValid },
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
      const result = await index.get(uuid);
      reset(result);
    };
    getEntry();
  }, [uuid, reset]);

  return (
    <form className="relative flex w-full flex-col gap-2 bg-base-100 rounded-box p-4">
        
      <EditButton  is_editing={editMode} setIsEditing={setEditMode} />

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

      

      <button disabled={!editMode} type="button" className="btn w-full btn-primary">
        SAVE
      </button>
    </form>
  );
};

export default DetailForm;
