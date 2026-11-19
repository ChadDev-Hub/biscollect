


export type ConstructionType = {
    id?: number;
    uuid?: string;
    activity: string;
    description: string;
    date: string;
    is_synced?: boolean;
    is_deleted?: boolean;
    
}
export type ManPowerStatus = {
    id?: number;
    uuid: string;
    cuuid: string;
    assigned_personnel: string;
    attendance_status?: string | number;
    reason_of_absence?: string;
}

export type VehicleReport = {
    id?: number;
    uuid: string;
    cuuid: string;
    vehicle_name: string;
    mileage_start: string;
    mileage_end: string;
}



export type LineConstructionType = {
 id?: number;
 uuid: string;
 cuuid: string;
 date_accomplished: string;   
 task: "Line Construction";
 type: "Line Extension" | "New Line";
 line_type:"Primary" | "Secondary" | "Underbuilt";
 description: string;
 phasing: string;
 pole_assembly: string;
 conductor: number | string;
 neutral: number | string;
 lat: number;
 lon: number;
 image: File;
 is_synced: boolean;
 datetime_synced?: string;
 is_deleted?: boolean;
 datetime_deleted?: string;
 pct_acc: number;
}

