"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
type Props = {
  returnPath: string;
  onNewEntry: () => void
};
const SubmitCompletion = (
  {returnPath, onNewEntry}: Props
) => {

  
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div role="alert" className="alert alert-success">
        <CircleCheck className="size-6" />
        <span>Submission Complete</span>
      </div>

      <div className="flex gap-4 justify-space-between">
        <Link
          href={returnPath}
          type="button"
          className="btn btn-secondary"
        >
          View Entry
        </Link>
        <button
          onClick={onNewEntry}
          type="button"
          className="btn btn-primary"
        >
          Add New Entry
        </button>
      </div>
    </div>
  );
};

export default SubmitCompletion;
