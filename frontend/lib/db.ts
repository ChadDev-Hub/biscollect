import { openDB, IDBPDatabase } from "idb";

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser.");
  }

  if (!dbPromise) {
    dbPromise = openDB("biscollect", 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          if (!db.objectStoreNames.contains("new_connections")) {
            const store = db.createObjectStore("new_connections", {
              keyPath: "id",
              autoIncrement: true,
            });
            store.createIndex("uuid", "uuid", { unique: true });
          }
          if (!db.objectStoreNames.contains("change_meters")) {
            const store = db.createObjectStore("change_meters", {
              keyPath: "id",
              autoIncrement: true,
            });
            store.createIndex("uuid", "uuid", { unique: true });
          }
        }

        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains("constructions")) {
            const store = db.createObjectStore("constructions", {
              keyPath: "id",
              autoIncrement: true,
            });
            store.createIndex("uuid", "uuid", { unique: true });
          }
          if (!db.objectStoreNames.contains("maintenance")) {
            const store = db.createObjectStore("maintenance", {
              keyPath: "id",
              autoIncrement: true,
            });
            store.createIndex("uuid", "uuid", { unique: true });
          }
        }
      },
    });
  }

  return dbPromise;
}
