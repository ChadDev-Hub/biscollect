"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloudUpload, Loader, CloudOff } from "lucide-react";
import { SyncNewConnection } from "@/lib/actions/new-connection-action";
import { getDB } from "@/lib/db";
import { useOnline } from "@/app/common/components/hooks/online-provider";
import { useAlert, Alerts } from "@/app/common/components/alert";
import { SyncChangeMeter } from "@/lib/actions/change-meter-action";

type SyncTableProps<T extends Record<string, unknown>> = {
  entries: T[];
  showAlert: (text: string, type: Alerts) => void;
  store: string;
  api: (form: FormData) => Promise<{
    uuid: string;
    is_synced: boolean;
  }>;
};
const SyncTable = async <T extends Record<string, unknown>>({
  entries,
  store,
  api,
  showAlert
}: SyncTableProps<T>) => {
  const db = await getDB();
  
  for (const entry of entries) {
    if (entry.is_synced) continue;
    const formData = new FormData();
    for (const [key, value] of Object.entries(entry)) {
      if (value === null) continue;
      if (value instanceof Blob) {
        formData.append(key, value);
      }else {
        formData.append(key, String(value));
      }
    }
    try {
      const res = await api(formData);
      await db.put(store, {
        ...entry,
        uuid: res.uuid,
        is_synced: true,
      });
    } catch (error) {
      console.error(error);
      showAlert("Failed to sync entry", "error");
    }
  }
  return true;
};
const ClaudeSyncButton = () => {
  const [loading, setLoading] = useState(false);
  const currentPath = usePathname();
  const { showAlert } = useAlert();
  const { isOnline, isMounted } = useOnline();
  let handleSync = async () => {};
  switch (currentPath) {
    case "/menu/new-connection":
      handleSync = async () => {
        setLoading(true);
        const db = await getDB();
        const result = await db.getAll("new_connections");
        const syncRes = await SyncTable({
          entries: result,
          store: "new_connections",
          api: SyncNewConnection,
          showAlert
        })
        console.log(syncRes);
        setLoading(false);
        window.dispatchEvent(new Event("new-connection-updated"));
      };
      break;
    case "/menu/change-meter":
      handleSync = async () => {
        setLoading(true);
        const db = await getDB();
        const result = await db.getAll("change_meters");
        const syncRes = await SyncTable({
          entries: result,
          store: "change_meters",
          api: SyncChangeMeter,
          showAlert
        })
        console.log(syncRes);
        setLoading(false);
        window.dispatchEvent(new Event("change-meter-updated"));
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
