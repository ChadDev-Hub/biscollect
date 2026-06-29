"use client";

import {useRouter} from "next/navigation";
import {CornerDownLeft} from "lucide-react"
type Props = {}

const ReturnMenu = (props: Props) => {
    const router = useRouter();
    const handleReturn = () => {
        router.back();
    }
  return (
    <button type="button" className="btn flex items-center gap-2 btn-primary" onClick={handleReturn}>
        <CornerDownLeft className="size-6" />
        <label className="text-xs font-bold text-neutral-content">Return</label>
    </button>
  )
}

export default ReturnMenu