
"use client"

import React, { useRef} from 'react'


const PersonelForm = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
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
    <dialog ref={modalRef} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
  )
}

export default PersonelForm