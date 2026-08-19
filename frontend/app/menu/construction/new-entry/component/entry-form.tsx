"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import InputField from "../../../../common/components/form-field-components/input-field";
import { UtilityPole} from "lucide-react";
import { LineConstructionType } from "@/types/construction";
import { GetConductorName } from "@/lib/actions/conductor";
import { ConductorName } from "@/types/conductor-wire";
import CheckBoxFieldOption from "../../../../common/components/form-field-components/radio-input-field";
import SelectInputField from "../../../../common/components/form-field-components/select-input-field";

const constuctionType = ["Line Extension", "New Line"];
const LineType = ["Primary", "Secondary", "Underbuilt"];
const Phasing = ["AN", "BN", "CN", "ABCN", "BCN", "ACN", "ABN", "BAN", "CAN"];
const LineConstrucitonEntryForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<LineConstructionType>({
    mode: "all",
    shouldUnregister: false,
  });
  const [conductors, setConductors] = useState<ConductorName[] | []>([]);

  // EFFECT THAT GET THE CONDUCTOR DATA
  useEffect(() => {
    const getConductorData = async () => {
      const data = await GetConductorName();
      if (data) {
        setConductors(data);
      }
    };
    getConductorData();
  }, []);



//   WATCH INPUTS
 const lineType = useWatch({
    control:control,
    name:"line_type"
 })
 const PhasingInput = useWatch({
    control:control,
    name:"phasing"
 })

  const onSubmit: SubmitHandler<LineConstructionType> = async (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-4 gap-4 bg-base-200 card w-full max-w-lg shadow-md"
    >
      {/* CONSTRUCTION TYPE */}
      <SelectInputField
        name="type"
        register={register}
        label="Construction Type"
        required={true}
        options={constuctionType}
        error={errors.type?.message}
      />

   
        {/* LINE TYPE */}
        <CheckBoxFieldOption
          name="line_type"
          register={register}
          label="Line Type"
          required={true}
          options={LineType}
          error={errors.line_type?.message}
          selected={lineType}
          className="grid grid-cols-3 gap-2 w-full  place-items-center"
        />

        {/* PHASING */}
        <CheckBoxFieldOption
        className="grid grid-cols-3 gap-2 w-full  place-items-center"
          name="phasing"
          register={register}
          label="Phasing"
          required={true}
          options={Phasing}
          selected={PhasingInput}
          error={errors.phasing?.message}
        />
   

      {/* pole assembly */}
      <InputField
        inputType="text"
        error={errors.pole_assembly?.message}
        required
        Icon={UtilityPole}
        name="pole_assembly"
        label="Pole Assembly"
        register={register}
      />

        {/* CONDUCTOR */}
        <SelectInputField
        name="conductor"
        register={register}
        label="Conductor"
        required={true}
        options={conductors.map((conductor) => conductor.name)}
        error={errors.conductor?.message}
      />


      {/* NEUTRAL WIRE TYPE */}
      <SelectInputField
      register={register}
      name="neutral"
      required={false}
      label="Neutral-Concentric Wire"
      options={conductors.map((conductor)=> conductor.name)}
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LineConstrucitonEntryForm;
