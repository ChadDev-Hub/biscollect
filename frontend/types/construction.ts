

export type LineConstructionType = {
 uuid: string;
 date_accomplished: string;   
 activity: "Line Construction";
 type: "Line Extension" | "New Line";
 line_type:"Primary" | "Secondary" | "Underbuilt";
 description: string;
 phasing: string;
 pole_assembly: string;
 conductor: string;
 neutral: string;
 lat: number;
 lon: number;
 image: File;
 is_synced: boolean;
 datetime_synced?: string;
 is_deleted?: boolean;
 datetime_deleted?: string;
}