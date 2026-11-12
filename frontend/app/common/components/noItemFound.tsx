
"use client";

import { SearchX } from "lucide-react";

type NoItemsFoundProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function NoItemsFound({
  title = "No items found",
  description = "There are currently no items to display.",
  actionLabel,
  onAction,
}: NoItemsFoundProps) {
  return (
    <div className="flex min-h-62.5 w-full flex-col items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-200/30 px-6 py-10 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-base-200 text-base-content/50">
        <SearchX size={30} strokeWidth={1.5} />
      </div>

      <h3 className="text-base font-semibold text-base-content">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-base-content/60">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn btn-primary btn-sm mt-5"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
