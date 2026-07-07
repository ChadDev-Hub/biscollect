

export type ChangeMeterType = {
    uuid?: string;
    date_accomplished: string;
    account_no: string;
    consumer_name: string;
    pull_out_meter: string;
    pull_out_meter_serial_no: string;
    pull_out_reading: number;
    new_meter_serial_no: string;
    new_meter_brand: string;
    meter_sealed: string;
    initial_reading: number;
    remarks: string;
    accomplished_by: string;
    lat: number;
    lon: number;
    image: File;
    is_synced: boolean;
}