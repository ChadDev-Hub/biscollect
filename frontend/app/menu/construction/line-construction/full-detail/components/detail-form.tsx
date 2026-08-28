"use client";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { CalendarDays, UtilityPole, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { LineConstructionType } from "@/types/construction";
import { getDB } from "@/lib/db";
import { useEffect, useState } from "react";
import SelectInputField from "../../../../../common/components/form-field-components/select-input-field";
import EditButton from "../../../../../common/components/edit-button";
import InputField from "@/app/common/components/form-field-components/input-field";
import TextAreaField from "@/app/common/components/form-field-components/text-area-field";
import CheckBoxFieldOption from "../../../../../common/components/form-field-components/radio-input-field";
import { ConductorName } from "../../../../../../types/conductor-wire";
import { GetConductorName, GetNeutralName } from "@/lib/actions/conductor";
import CoordinatesField from "@/app/common/components/form-field-components/coordinates-field";
import ImageField from "@/app/common/components/form-field-components/image-field";
import { useAlert } from '@/app/common/components/alert';

const DetailForm = () => {
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const [editMode, setEditMode] = useState(false);
  const [conductors, setConductors] = useState<ConductorName[] | []>([]);
  const [neutral, setNeutral] = useState<ConductorName[] | []>([]);
  const {showAlert} =  useAlert();
  const {
    register,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LineConstructionType>({
    mode: "all",
    shouldUnregister: false,
  });
  //   EFFECT THAN GET LINE CONSTRUCTION DATA
  useEffect(() => {
    const getEntry = async () => {
      const idb = await getDB();
      const transaction = idb.transaction("line_constructions", "readwrite");
      const store = transaction.objectStore("line_constructions");
      const index = store.index("uuid");
      const result = await index.get(uuid ?? "");
      reset(result);
    };
    getEntry();
  }, [uuid, reset]);

  //   EFFECT THAT GET THE CONDUCTOR DATA

  useEffect(() => {
    const getConductorData = async () => {
      const data = await GetConductorName();
      if (data) {
        setConductors(data);
      }
    };
    const getNeutralData = async () => {
      const data = await GetNeutralName();
      if (data) {
        setNeutral(data);
      }
    };

    getConductorData();
    getNeutralData();
  }, []);
  
  //   WATCH INPUTS
  const lineType = useWatch({
    control: control,
    name: "line_type",
  });
  const PhasingInput = useWatch({
    control: control,
    name: "phasing",
  });

  const onSubmit: SubmitHandler<LineConstructionType> = async (data) => {
    try {
      const db = await getDB();
      const transaction = db.transaction("line_constructions", "readwrite");
      const store = transaction.objectStore("line_constructions");
      await store.put({
        ...data,
        is_synced: false,
      });
      console.log(data);
      await transaction.done;

      setEditMode(false);
      window.dispatchEvent(new Event("line_constructions-updated"));
      showAlert("Line Construction Updated", "success");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4 relative bg-base-100 p-4 max-w-md rounded-box"
    >
      <EditButton is_editing={editMode} setIsEditing={setEditMode} />
      <input type="hidden" {...register("activity")} />
      <InputField
        name="date_accomplished"
        register={register}
        label="Date Accomplished"
        required={true}
        isDisabled={!editMode}
        Icon={CalendarDays}
        inputType="date"
      />
      {/* CONSTRUCTION TYPE */}
      <SelectInputField
        name="type"
        register={register}
        label="Type"
        required={true}
        options={["Line Extension", "New Line"]}
        disabled={!editMode}
      />
      {/* INFORMATION */}
      <TextAreaField
        name="description"
        register={register}
        label="Information"
        isDisabled={!editMode}
      />

      {/* LINE TYPE  */}
      <CheckBoxFieldOption
        selected={lineType}
        name="line_type"
        register={register}
        label="Line Type"
        required={true}
        isDisabled={!editMode}
        options={["Primary", "Secondary", "Underbuilt"]}
        className="grid grid-cols-3 gap-2 w-full  place-items-center"
      />

      {/* PHASING */}
      <CheckBoxFieldOption
        className="grid grid-cols-3 gap-2 w-full  place-items-center"
        name="phasing"
        register={register}
        label="Phasing"
        required={true}
        selected={PhasingInput}
        isDisabled={!editMode}
        options={["AN", "BN", "CN", "ABCN", "BCN", "ACN", "ABN", "BAN", "CAN"]}
      />

      {/* pole assembly */}
      {lineType === "Primary" && (
        <InputField
          inputType="text"
          required={false}
          Icon={UtilityPole}
          name="pole_assembly"
          label="Pole Assembly"
          register={register}
          isDisabled={!editMode}
        />
      )}

      {/* CONDUCTOR */}
      <SelectInputField
        name="conductor"
        register={register}
        label="Conductor"
        required={true}
        options={conductors}
        error={errors.conductor?.message}
        disabled={!editMode}
      />

      {/* NEUTRAL */}
      <SelectInputField
        register={register}
        name="neutral"
        required={false}
        label="Neutral-Concentric Wire"
        options={neutral}
        disabled={!editMode}
      />

      {/* COORDINATES */}
      <CoordinatesField
        Icon={MapPin}
        register={register}
        setValue={setValue}
        latitudeError={errors.lat?.message}
        control={control}
        is_disabled={!editMode}
      />

      {/* IMAGE FIELD */}
      <ImageField control={control} error={errors.image?.message} is_disabled={!editMode} />

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!editMode}
      >
        Save
      </button> 
    </form>
  );
};

export default DetailForm;
