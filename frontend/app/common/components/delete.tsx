"use client";
import { useRef } from "react";
import { getDB } from "@/lib/db";
import {useAlert }from "./alert";
type Props = {
  store: string;
  uuid: string;
};

const DeleteRecord = ({ store, uuid }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleClose = () => modalRef.current?.close();
  const handleOpend = () => modalRef.current?.showModal();
  const dateTimeNow = new Date().toISOString();
  const { showAlert } = useAlert();
  const deleteRecord = async () => {
    const idb = await getDB();
    const transaction = idb.transaction(store, "readwrite");
    const items = transaction.objectStore(store);
    const index = items.index("uuid");
    const result = await index.get(uuid);
    await items.put({ ...result, is_synced: false, is_deleted: true, datetime_synced: null, datetime_deleted:  dateTimeNow });
    await transaction.done;
    handleClose();
    showAlert("Record deleted successfully", "success");
    window.dispatchEvent(new Event(`${store}-updated`));
  };
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
              <button className="btn btn-error" onClick={deleteRecord}>
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
