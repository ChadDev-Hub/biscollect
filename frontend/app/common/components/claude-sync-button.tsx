"use client";
import { usePathname } from "next/navigation";
import { useState, SetStateAction, Dispatch } from "react";
import { CloudUpload, Loader, CloudOff } from "lucide-react";
import { SyncNewConnection } from "@/lib/actions/new-connection-action";
import { getDB } from "@/lib/db";
import { useOnline } from "@/app/common/components/hooks/online-provider";
import { useAlert } from "@/app/common/components/alert";
import { SyncChangeMeter } from "@/lib/actions/change-meter-action";
import { SyncLineConstruction } from "@/lib/actions/line-construction";
import { useProgress } from "@/app/common/components/hooks/progress";
import { useStackingAlert } from "@/app/common/components/stacking-alert";
import { Alert } from "@/types/alert";
import axios from "axios";

type SyncTableProps<T extends Record<string, unknown>> = {
  entries: T[];

  store: string;
  api: (form: FormData) => Promise<{
    uuid: string;
    is_synced: boolean;
    datetime_synced: string;
  }>;
  events: string;
  count_unsync?: number;
  setProgress?: Dispatch<SetStateAction<number>>;
  appendAlert?: (alert: Alert) => void;
};
const SyncTable = async <T extends Record<string, unknown>>({
  entries,
  store,
  api,
  events,
  count_unsync,
  setProgress,
  appendAlert,
}: SyncTableProps<T>) => {
  const db = await getDB();
  let completed = 0;
  for (const entry of entries) {
    if (entry.is_synced) continue;
    const formData = new FormData();
    for (const [key, value] of Object.entries(entry)) {
      if (value === null) continue;
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
    try {
      const res = await api(formData);
      await db.put(store, {
        ...entry,
        uuid: res.uuid,
        is_synced: true,
        datetime_synced: res.datetime_synced,
      });
      window.dispatchEvent(new Event(events));
      completed++;
      if (count_unsync && setProgress)
        setProgress(Math.round((completed / count_unsync) * 100));
      appendAlert?.({
        id: crypto.randomUUID(),
        message: {
          id: String(entry.uuid),
          text: "Successfully synced entry"
        },
        alertType: "success",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        completed++;
        appendAlert?.({
          id: crypto.randomUUID(),
          message: {
            id: String(entry.uuid),
            text: "Failed to sync entry" ,
            responseMessage: error.response?.data.detail,
          },
          alertType: "error",
        });
      }
      continue;
    }
  }
  return true;
};
const ClaudeSyncButton = () => {
  const [loading, setLoading] = useState(false);
  const currentPath = usePathname();
  const { showAlert } = useAlert();
  const { isOnline, isMounted } = useOnline();
  const { setProgress, setShowProgress } = useProgress();
  const { appendAlerts } = useStackingAlert();

  let handleSync = async () => {};
  switch (currentPath) {
    case "/menu/new-connection":
      handleSync = async () => {
        try {
          setLoading(true);
          setShowProgress(true);
          const db = await getDB();
          const result = await db.getAll("new_connections");
          const countUnsynced = result.filter(
            (entry) => !entry.is_synced,
          ).length;
          // IF ALL ENTRIES ARE SYNCED
          if (countUnsynced === 0) {
            setLoading(false);
            showAlert("All entries are synced", "info");
            return;
          }
          await SyncTable({
            entries: result,
            store: "new_connections",
            api: SyncNewConnection,
            events: "new_connections-updated",
            count_unsync: countUnsynced,
            setProgress: setProgress,
            appendAlert: appendAlerts,
          });
        } finally {
          setLoading(false);
          setShowProgress(false);
          setProgress(0);
        }
      };
      break;
    case "/menu/change-meter":
      handleSync = async () => {
        try {
          setLoading(true);
          setShowProgress(true);
          const db = await getDB();
          const result = await db.getAll("change_meters");
          const countUnsynced = result.filter((entry) => !entry.is_synced);
          // IF ALL ENTRIES ARE SYNCED
          if (countUnsynced.length === 0) {
            setLoading(false);
            showAlert("All entries are synced", "info");
            return;
          }
          await SyncTable({
            entries: result,
            store: "change_meters",
            api: SyncChangeMeter,
            events: "change_meters-updated",
            count_unsync: countUnsynced.length,
            setProgress: setProgress,
            appendAlert: appendAlerts,
          });
        } finally {
          setLoading(false);
          setShowProgress(false);
          setProgress(0);
        }
      };
      break;
    case "/menu/construction/line-construction":
      handleSync = async () => {
        try {
          setLoading(true);
          setShowProgress(true);
          const db = await getDB();
          const result = await db.getAll("line_constructions");
          const countUnsynced = result.filter(
            (entry) => !entry.is_synced,
          ).length;
          // IF ALL ENTRIES ARE SYNCED
          if (countUnsynced === 0) {
            setLoading(false);
            showAlert("All entries are synced", "info");
            return;
          }

          await SyncTable({
            entries: result,
            store: "line_constructions",
            api: SyncLineConstruction,
            events: "line_constructions-updated",
            count_unsync: countUnsynced,
            setProgress: setProgress,
            appendAlert: appendAlerts,
          });
        } finally {
          setLoading(false);
          setShowProgress(false);
          setProgress(0);
        }
      };
      break;
    default:
      break;
  }

  if (!isMounted)
    return (
      <>
        <Loader className="animate-spin text-secondary" />
      </>
    );

  return (
    <button
      disabled={loading || !isOnline}
      type="button"
      onClick={handleSync}
      title="Sync to Claude"
      className="btn btn-circle"
    >
      {loading ? (
        <Loader className="animate-spin text-secondary" />
      ) : isOnline ? (
        <CloudUpload className="size-6 text-secondary" />
      ) : (
        <CloudOff className="size-6 text-neutral-content" />
      )}
    </button>
  );
};

export default ClaudeSyncButton;
