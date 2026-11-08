"use client";
import { useRef, ReactNode,createContext, useContext } from "react";
import { StickyNotePlus } from "lucide-react";
type Props = {
  children:ReactNode;
};

type ContextType = {
  handleOpen: () => void;
  handleClose: () => void;
}

const AddProjectContext = createContext<ContextType>({
  handleOpen: () => {},
  handleClose: () => {},
});

const AddProject = ({ children }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleClose = () => modalRef.current?.close();
  const handleOpen = () => modalRef.current?.showModal();
  return (
    <AddProjectContext.Provider value={{handleOpen, handleClose}}>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={handleOpen}
      >
        <StickyNotePlus className="size-6" />
        Add Project
      </button>
      <dialog ref={modalRef} className="modal backdrop-blur-xl">
        <div className="modal-box ">
           <button onClick={handleClose}  className="btn btn-sm btn-circle btn-ghost absolute right-2 z-10 top-2">
              ✕
            </button>
           <h1 className="absolute top-0 left-0 bg-base-300 font-extrabold text-base-content p-2 w-full">Add Project</h1>
          {children} 
        </div>
      </dialog>
    </AddProjectContext.Provider>
  );
};


export const useAddProjectModal = () => {
  const context = useContext(AddProjectContext);
  if (context === undefined) {
    throw new Error("useAddProjectModal must be used within a AddProjectProvider");
  }
  return context;
}
export default AddProject;
