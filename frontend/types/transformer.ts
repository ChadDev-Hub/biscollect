
export type TransformerType = {
    id: number;
    name: string; 
}


export type TransformerInstallation = {
    id?: number;
    
    uuid: string;
    cuuid: string; 
    date: string;
    pct_acc: number
    transformer_type_id: number;
    use_type: "Sole"| "Distribution";
    phasing: string;
    lat: string;
    lon: string;
    is_synced?: boolean;
    datetime_synced?: string;
    is_deleted?: boolean;
    datetime_deleted: string;
    
    
}