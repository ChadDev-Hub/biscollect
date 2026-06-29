"use client"

import { UseFormRegister } from "react-hook-form"
import {NewConnectionType} from "@/types/new-connection";

type Props = {
    register: UseFormRegister<NewConnectionType>
}

const MeterSerialNumber = ({register}: Props) => {
  return (
   
        <section className="w-full flex flex-col">
            <label className="label font-bold">
                <span className="">Meter Serial Number</span>
                <span className=" text-red-500">*</span>
            </label>
            <input
                {...register("meter_serial_no", {
                    required: { value: true, message: "Meter Serial Number is Required" },
                })}
                type="text"  
                className="input w-full"
            />
        </section>

  )
}

export default MeterSerialNumber;