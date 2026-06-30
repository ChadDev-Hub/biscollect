"use client";

import { CircleCheck } from "lucide-react";

type Props = {
  returnPath: string;
};
const SubmitCompletion = (
  {returnPath}: Props
) => {
  const handleViewEntry = () => {
    window.location.href = returnPath;
  };

  const handleNewEntry = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div role="alert" className="alert alert-success">
        <CircleCheck className="size-6" />
        <span>Submission Complete</span>
      </div>

      <div className="flex gap-4 justify-space-between">
        <button
          type="button"
          onClick={handleViewEntry}
          className="btn btn-secondary"
        >
          View Entry
        </button>
        <button
          onClick={handleNewEntry}
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
