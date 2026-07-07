

export type NewConnectionType = {
    uuid?: string;
    date_accomplished: string;
    account_no: string;
    consumer_name: string;
    meter_serial_no: string;
    meter_brand: string;
    meter_sealed: string;
    initial_reading: number;
    multiplier: number;
    remarks: string;
    accomplished_by: string;
    lat: number;
    lon: number;
    image: File;
    is_synced: boolean;
}

