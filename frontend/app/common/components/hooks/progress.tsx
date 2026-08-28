"use client";
import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";
import {Loader} from "lucide-react"
type Props = {
  children: ReactNode;
};

type ContextType = {
  setProgress: Dispatch<SetStateAction<number>>;
  setShowProgress: Dispatch<SetStateAction<boolean>>
};

const ProgressContext = createContext<ContextType>({
  setProgress: () => {},
  setShowProgress: () => {}
});
const ProgressProvider = ({ children }: Props) => {
  const [progress, setProgress] = useState<number>(0);
  
  const [showProgress, setShowProgress] = useState<boolean>(false);
  

  return (
    <ProgressContext.Provider value={{ setProgress, setShowProgress }}>
      {showProgress  && (
        <div className="bg-base-300 rounded-box flex flex-col items-center justify-center gap-2 w-full max-w-xs p-4 z-100 fixed bottom-3/12 left-1/2 -translate-x-1/2">
          <h1 className="text-lg font-bold text-base-content">Syncing...</h1>

          {progress > 0 ? <div
            className="radial-progress text-primary"
            aria-valuenow={progress}
            style={
              {
                "--value": progress,
              } as React.CSSProperties
            }
            role="progressbar"
          >
            <span>{progress}%</span>
          </div> : <Loader className="animate-spin text-primary size-6" />}
        </div>
      )}
      {children}
    </ProgressContext.Provider>
  );
};
const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};
export { useProgress };
export default ProgressProvider;
