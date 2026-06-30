import { openDB } from "idb";

export const db = openDB("biscollect", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("new_connections")) {
      const store = db.createObjectStore("new_connections", {
        keyPath: "uuid",
      });
      store.createIndex("uuid", "uuid", { unique: true });
    }
  },
});
