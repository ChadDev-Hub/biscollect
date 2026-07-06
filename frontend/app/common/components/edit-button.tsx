"use client";


import React from 'react'
import { Pencil, PencilOff } from "lucide-react";
type Props = {
    is_editing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const EditButton = ({is_editing, setIsEditing}: Props) => {
  return (
    <label data-tip="Edit" className="swap absolute top-2 right-2 tooltip tooltip-left tooltip-info swap-rotate p-2 transition-all duration-300 rounded-full w-fit bg-base-200">
        <input checked={is_editing} onChange={(e) => setIsEditing(e.target.checked)} title="Edit" type="checkbox" />
        <Pencil className="swap-off text-secondary  size-4" />
        <PencilOff className="swap-on text-secondary size-4" />
    </label>
  )
}

export default EditButton;