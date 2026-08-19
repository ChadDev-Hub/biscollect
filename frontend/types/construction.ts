

export type LineConstructionType = {
 activity: string;
 type: "line extension" | "new line";
 line_type:"primary" | "secondary" | "underbuilt";
 phasing: string;
 pole_assembly: string;
 conductor: string;
 neutral: string;
 lat: number;
 lon: number;
 image: File;
}