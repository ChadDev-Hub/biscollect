"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import type { ConstructionType } from "@/types/construction";
import InputField from "@/app/common/components/form-field-components/input-field";
import { Calendar, NotepadText, Workflow } from "lucide-react";
import {addConstruction, addConstructionActivity} from "./construction-slice";
import { useAppDispatch } from '../../../hooks';
import { useAddProjectModal } from '../../../common/components/buttons/add-project';

type FormType = ConstructionType;

const ProjectForm = () => {
  
  const {handleClose} = useAddProjectModal();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormType> = (data) => {
    const uuid = crypto.randomUUID();
    const formData: ConstructionType = {
      ...data,
      uuid,
    };
    dispatch(addConstruction(formData));
    dispatch(addConstructionActivity(formData));
    reset();
    handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="dialog"
      className="mt-6 relative space-y-2"
    >
      <InputField
        Icon={Calendar}
        name="date"
        register={register}
        label="Project Name"
        required={true}
        inputType="date"
        error={errors.date?.message}
      />

      <InputField
        Icon={Workflow}
        name="activity"
        register={register}
        label="Activity"
        required={true}
        error={errors.activity?.message}
      />

      <InputField
        Icon={NotepadText}
        name="description"
        register={register}
        label="Description"
        required={false}
      />
      <button type="submit" className="btn btn-success w-full">Save Project</button>
    </form>
  );
};

export default ProjectForm;
