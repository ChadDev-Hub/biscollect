"use client";

import { ReactNode } from 'react'
import Link from 'next/link'
type Props = {
  label: string;
  icon: ReactNode;
  route: string;
  isCommingSoon?: boolean;
};

const Tool = ({
  label,
  icon,
  route,
  isCommingSoon
}: Props) => {
  return (
    <Link
      prefetch
      href={isCommingSoon ? "#" : route}
      type="button"
      className="flex relative btn-neutral btn rounded-2xl flex-col   min-h-32 items-center justify-center p-4 cursor-pointer shadow-md bg-linear-to-r from-primary/20   via-neutral/10 to-primary/20"
    >
      <div className="border-neutral-content border p-4 rounded-full">
        {icon}
      </div>
      {isCommingSoon && <span className="absolute badge-lg glass text-[0.5rem] z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 badge badge-info badge-outline">Coming Soon</span>}
      <label className="text-xs font-bold text-neutral-content">{label}</label>
    </Link>
  );
}

export default Tool