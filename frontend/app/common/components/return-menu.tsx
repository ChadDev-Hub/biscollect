"use client";

import {useRouter, usePathname} from "next/navigation";
import {CornerDownLeft} from "lucide-react"


const ReturnMenu = () => {
    const router = useRouter();
    const currentPath = usePathname();
    const pathReturnsToMenu = [
        "/menu/new-connection",
        "/menu/change-meter"
    ]
    const handleReturn = () => {
        if (pathReturnsToMenu.includes(currentPath)) {
            router.push("/menu");
        }else{
            router.back();
        }
    }
  return (
    <button type="button" className="btn flex items-center gap-2 btn-primary" onClick={handleReturn}>
        <CornerDownLeft className="size-6" />
        <label className="text-xs font-bold text-neutral-content">Return</label>
    </button>
  )
}

export default ReturnMenu