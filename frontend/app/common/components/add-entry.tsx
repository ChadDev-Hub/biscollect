"use client";
import { CirclePlus } from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";


const AddEntries = () => {
    const currentPath = usePathname();
  return (
    <Link
      href={`${currentPath}/new-entry`}
      data-tip="Add Entry"
      className="btn btn-circle btn-outline btn-primary tooltip tooltip-left tooltip-info"
      type="button"
      title="Add Entry"
      aria-label="Add Entry"
    >
      <CirclePlus className="size-6" />
    </Link>
  );
};

export default AddEntries;
