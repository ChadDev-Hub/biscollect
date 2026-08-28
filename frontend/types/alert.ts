


export type AlertType = "success" | "error" | "warning" | "info";

export type Alert = {
  id: string;
  alertType: AlertType;
  message: MessageAlertType;
};



export type MessageAlertType = {
    id: string | number;
    text: string;
    responseMessage?:string;

    
}