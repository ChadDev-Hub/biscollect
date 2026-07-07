"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloudUpload, Loader } from "lucide-react";
import {SyncNewConnection} from "@/lib/actions/new-connection-action";
import {getDB} from "@/lib/db";

const ClaudeSyncButton = () => {
  const [loading, setLoading] = useState(false);
  const currentPath = usePathname();

  let handleSync = async () => {};
  switch (currentPath) {
    case "/menu/new-connection":
      handleSync = async () => {
        setLoading(true);
        const db = await getDB();
        const transaction = db.transaction("new_connections", "readwrite");
        const result = await transaction.objectStore("new_connections").getAll();
        
        for (const entry of result) {
            const formData = new FormData();
            for (const key in entry) {
                formData.append(key, entry[key]);
            }
            const res = await SyncNewConnection(formData);
            if (res.error) return console.error(res.error);
        }
        await transaction.done;
        setLoading(false);
        // window.location.reload();
      };
      break;
    case "/menu/change-meter":
      handleSync = async () => {
        const db = await getDB();
        const transaction = db.transaction("change_meters", "readwrite");
        const result = await transaction.objectStore("change_meters").getAll();
        for (const entry of result) {
            if(entry.is_synced === false){
                await transaction.objectStore("change_meters").put({...entry, is_synced: true});
            }
        }
        await transaction.done;
        window.location.reload();
      }
      break;
    default:
      break;
  }
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
      ) : (
        <CloudUpload className="size-6 text-secondary" />
      )}
    </button>
  );
};

export default ClaudeSyncButton;
