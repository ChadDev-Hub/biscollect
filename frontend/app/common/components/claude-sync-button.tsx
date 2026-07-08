"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloudUpload, Loader, CloudOff } from "lucide-react";
import { SyncNewConnection } from "@/lib/actions/new-connection-action";
import { getDB } from "@/lib/db";
import { useOnline } from "@/app/common/components/hooks/online-provider";
import {useAlert} from "@/app/common/components/alert";
import { SyncChangeMeter } from "@/lib/actions/change-meter-action";
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

        for (const entry of result) {
          if (entry.is_synced) continue;
          const formData = new FormData();
          for (const key in entry) {
            formData.append(key, entry[key]);
          }
          try {
            const res = await SyncNewConnection(formData);
            await db.put("new_connections", {
              ...entry,
              uuid: res.uuid,
              is_synced: true,
            });
          } catch (error) {
            console.error(error);
            showAlert("Failed to sync new connection", "error");
          }
        }
        setLoading(false);
        window.dispatchEvent(new Event("new-connection-updated"));
      };
      break;
    case "/menu/change-meter":
      handleSync = async () => {
        const db = await getDB();
        const result = await db.getAll("change_meters");
        for (const entry of result) {
          if (entry.is_synced) continue;
          const formData = new FormData();
          for (const key in entry) {
            formData.append(key, entry[key]);
          }
          try {
            const res = await SyncChangeMeter(formData);
            await db.put("change_meters", {
              ...entry,
              uuid: res.uuid,
              is_synced: true,
            });
          } catch (error) {
            console.error(error);
            showAlert("Failed to sync change meter", "error");
          }
        }

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
      disabled={loading}
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
