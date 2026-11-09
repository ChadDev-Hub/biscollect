"use client";

import { useRouter} from 'next/navigation';
import {CornerDownLeft} from "lucide-react"
import {useSearchParams} from "next/navigation";


const ReturnMenu = () => {
    const router = useRouter();
    const params = useSearchParams();
    const returnTo = params.get("returnTo");
 
    const handleReturn = () => {
        if (!returnTo) {
            router.back();
            return;
        }
        router.replace(returnTo);
    }
  return (
    <button type="button" className="btn btn-sm flex items-center gap-2 btn-primary" onClick={handleReturn}>
        <CornerDownLeft className="size-6" />
        <label className="text-xs font-bold text-neutral-content">Return</label>
    </button>
  )
}

export default ReturnMenu