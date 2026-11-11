"use client";

import { useRouter } from "next/navigation";
import { CornerDownLeft } from "lucide-react";
import { popUrl } from "@/app/common/slice/navigationSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const ReturnMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageHistory = useAppSelector((state) => state.navigation.history);

  const handleReturn = () => {
    const previousPage = pageHistory.at(-1);
    if (!previousPage) return;
    router.push(previousPage);
    dispatch(popUrl());
  };
  return (
    <button
      type="button"
      className="btn btn-sm flex items-center gap-2 btn-primary"
      onClick={handleReturn}
    >
      <CornerDownLeft className="size-6" />
      <label className="text-xs font-bold text-neutral-content">Return</label>
    </button>
  );
};

export default ReturnMenu;
