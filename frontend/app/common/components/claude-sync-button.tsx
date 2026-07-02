"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloudUpload, Loader } from "lucide-react";
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
        console.log(result);
        for (const entry of result) {
            if(entry.is_synced === false){
                await transaction.objectStore("new_connections").put({...entry, is_synced: true});
            }
            
        }
        await transaction.done;
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
        window.location.reload();
      };
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
