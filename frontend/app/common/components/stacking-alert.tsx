"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Alert, AlertType } from "@/types/alert";
type Props = {
  children: React.ReactNode;
};

type StackingAlertContextType = {
  appendAlerts: (alert: Alert) => void;
};

const alertStyle: Record<AlertType, string> = {
  success: "alert alert-success alert-soft",
  warning: "alert alert-warning alert-soft",
  error: "alert alert-error alert-soft",
  info: "alert alert-info alert-soft",
};

const StackingAlertContext = createContext<StackingAlertContextType>({
  appendAlerts: () => {},
});

const StackingAlert = ({ children }: Props) => {
  const [alert, setAlert] = useState<Alert[]>([]);

  const appendAlerts = (alert: Alert) => {
    setAlert((prevAlerts) => [alert, ...prevAlerts]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert((prevAlerts) => prevAlerts.slice(1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <StackingAlertContext.Provider value={{ appendAlerts }}>
      <div className="z-50 max-h-[40%] overflow-y-scroll w-full max-w-xs   flex flex-col gap-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {alert.map((alert) => (
          <div
            key={alert.id}
            className={`${alertStyle[alert.alertType]} flex w-full flex-col items-center animate-fade-in-down justify-center`}
          >
            <div className=" w-full">
                <p className={`text-${alert.alertType} font-bold text-primary text-center`}>{alert.message.text} :</p>
                <p className="font-thin w-full italic text-xs text-secondary text-center">
                  {alert.message.id}
                </p>
                <p className="text-xs text-center text-base-content">
                  {alert.message.responseMessage}
                </p>
            </div>
          </div>
        ))}
      </div>
      {children}
    </StackingAlertContext.Provider>
  );
};

const useStackingAlert = () => {
  const context = useContext(StackingAlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};

export { useStackingAlert };
export default StackingAlert;
