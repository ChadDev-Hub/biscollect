"use client";

import { CircleCheck, TriangleAlert, CircleAlert, CircleX } from "lucide-react";
import { useState, createContext, useEffect, useContext } from "react";

type Alerts = "success" | "warning" | "error" | "info";
type Props = {
  children: React.ReactNode;
};

type AlertContextType = {
  showAlert: (text: string, type: Alerts) => void;
};

const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
});

const Alert = ({ children }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [alertType, setAlertType] = useState<Alerts>();
  const [text, setText] = useState("");

  const showAlert = (text: string, type: Alerts) => {
    setAlertType(type);
    setText(text);
    setIsShow(true);
  };

  useEffect(() => {
    if (isShow) {
      const timer = setTimeout(() => {
        setIsShow(false);
        setAlertType(undefined);
        setText("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isShow]);
  const svg = () => {
    switch (alertType) {
      case "success":
        return <CircleCheck className="size-6" />;
      case "warning":
        return <TriangleAlert className="size-6" />;
      case "error":
        return <CircleX className="size-6" />;
      case "info":
        return <CircleAlert className="size-6" />;
      default:
        break;
    }
  };
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {isShow && (
        <div
          role="alert"
          className={`alert alert-soft alert-${alertType}  z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          {svg()}
          <span>{text}</span>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};


const useAlert = () => {
    const context = useContext(AlertContext)
    if (context === undefined) {
        throw new Error('useAlert must be used within a AlertProvider')
    }
    return context
};
export { useAlert };
export default Alert;
