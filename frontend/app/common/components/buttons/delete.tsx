"use client";
import { useRef } from "react";
import {useAlert }from "../alert";


type Props = {
 onClick: () => void
};

const DeleteRecord = ({onClick}: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleClose = () => modalRef.current?.close();
  const handleOpend = () => modalRef.current?.showModal();
  const { showAlert } = useAlert();

  const handleDelete = async () => {
    onClick();
    handleClose();
    showAlert("Record deleted successfully", "success");
  }
  return (
    <>
      <button onClick={handleOpend} className="btn btn-error btn-sm">
        Delete Record
      </button>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <div>
            <h3 className="font-bold text-lg">Delete Record</h3>
            <p className="py-4">Are you sure you want to delete this record?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
              <button className="btn" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteRecord;
