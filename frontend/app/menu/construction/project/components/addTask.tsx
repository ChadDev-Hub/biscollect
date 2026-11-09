"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { X, UtilityPole, ArrowUpRight, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
const AddTask = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const searchParams = useSearchParams();
  const project_id = searchParams.get("cuuid");
  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }
  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleOpenModal}>
      Add Task
    </button>

    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-md rounded-2xl p-6">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          onClick={handleCloseModal}
         
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold">Add Task</h3>
          <p className="text-sm text-base-content/60 mt-1">
            Select the construction activity you want to create.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={`/menu/construction/project/line-construction?cuuid=${project_id}`}
            className="group flex items-center gap-4 rounded-xl border border-base-300 p-4 transition-all hover:border-primary hover:bg-primary/5 active:border-primary active:bg-primary/5"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UtilityPole size={22} />
            </div>

            <div className="flex-1">
              <h4 className="font-semibold">Line Construction</h4>
              <p className="text-xs text-base-content/60 mt-1">
                Create a new line construction project
              </p>
            </div>

            <ArrowUpRight
              size={18}
              className="text-base-content/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-active:-translate-y-0.5 group-active:translate-x-0.5 group-active:text-primary"
            />
          </Link>

          <Link
            href={`/menu/construction/project/transformer-installation?cuuid=${project_id}`}
            className="group flex items-center gap-4 rounded-xl border border-base-300 p-4 transition-all hover:border-primary hover:bg-primary/5 active:border-primary active:bg-primary/5"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap size={22} />
            </div>

            <div className="flex-1">
              <h4 className="font-semibold">Transformer Installation</h4>
              <p className="text-xs text-base-content/60 mt-1">
                Create a new transformer installation
              </p>
            </div>

            <ArrowUpRight
              size={18}
              className="text-base-content/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-active:-translate-y-0.5 group-active:translate-x-0.5 group-active:text-primary"
            />
          </Link>
        </div>
      </div>

      
    </dialog>
    </>
  );
};

export default AddTask;
