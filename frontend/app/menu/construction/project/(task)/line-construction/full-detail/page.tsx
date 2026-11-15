"use client";

import DetailForm from "./components/detail-form";
import { Suspense } from "react";

const FullDetail = () => {
  return (
    
        <Suspense fallback={<div>Loading...</div>}>
          <DetailForm />
        </Suspense>
    
  );
};

export default FullDetail;
