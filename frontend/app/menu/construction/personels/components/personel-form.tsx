"use client";

import React, { useRef } from "react";
import { X, Check, UserRoundPlus, User} from "lucide-react";
import {useForm, SubmitHandler } from "react-hook-form";
import {ManPowerStatus} from "@/types/construction";
import InputField from '@/app/common/components/form-field-components/input-field';
import SelectInputField from '@/app/common/components/form-field-components/select-input-field';

const PersonelForm = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit } = useForm<ManPowerStatus>();
  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  const onSubmit: SubmitHandler<ManPowerStatus> = (data) => {
    console.log(data);
  }
  return (
    <>
      <button onClick={handleOpenModal} className="btn btn-primary group btn-sm hover:text-accent">
        
            <UserRoundPlus className="size-5 group-hover:fill-accent/50 group-hover:stroke-accent" /> Add Personel
      

      </button>
      <dialog  ref={modalRef} className="modal">
        <form onSubmit={handleSubmit(onSubmit)} className="modal-box relative space-y-4">
          <h3 className="font-bold text-lg">Personel Sheet</h3>
          <button
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle absolute right-2 top-2 group"
          >
           <X className="size-5 
           group-active:rotate-360
           group-active:fill-error/50
            group-active:stroke-error
            group-hover:rotate-360 duration-1000 transition-transform group-hover:fill-error/50 group-hover:stroke-error" />

           
          </button>
            {/* INPUTS  */}
            <div>
                {/* ASSIGNED PERSONNEL */}
                <InputField
                Icon={User}
                label="Assigned Personnel"
                register={register}
                name="assigned_personnel"
                required
                />
                {/* ATTENDANCE STATUS */}
                <SelectInputField
                Icon={User}
                label="Attendance Status"
                register={register}
                name="attendance_status"
                required
                options={[
                    {
                    id: 1,
                    name: "Present"},
                    {id: 2,
                    name: "Absent"} 
                ]}
                />

            </div>
        


          <div className="modal-action">
            
          </div>
        </form>
      </dialog>
    </>
  );
};

export default PersonelForm;
