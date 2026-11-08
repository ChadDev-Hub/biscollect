import { openDB, IDBPDatabase } from "idb";

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser.");
  }

  if (!dbPromise) {
    dbPromise = openDB("biscollect", 6, {
      
      upgrade(db, oldVersion, newVersion, tx) {
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
        if (oldVersion < 3) {
          if (!db.objectStoreNames.contains("consumer_meters")) {
            const store = db.createObjectStore("consumer_meters", {
              keyPath: "properties.id",
            });
            store.createIndex("hash", "properties.hash", { unique: true });
          }
        }
        // LINE CONSTRUCTION TABLE
        if (oldVersion < 4) {
          if (!db.objectStoreNames.contains("line_constructions")) {
            const store = db.createObjectStore("line_constructions", {
              keyPath: "id",
              autoIncrement: true,
            });
            store.createIndex("uuid", "uuid", { unique: true });
          }

          if (!db.objectStoreNames.contains("transformer_constructions")) {
            const store = db.createObjectStore("transformer_constructions", {
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
        if (oldVersion < 5){ 
          if (!db.objectStoreNames.contains("constructions")){
            const store = db.createObjectStore("constructions",{
              keyPath: "id",
              autoIncrement: true
            });
            store.createIndex("uuid", "uuid", { unique: true });
          }
        }
        // CREATE INDEX WHEN VERSION CHANGES
        if (oldVersion < 6){
          // CREATE INDEX FOR LINE CONSTRUCTION
          if(db.objectStoreNames.contains("line_constructions")){
            
            const store = tx.objectStore("line_constructions")
            if (!store.indexNames.contains("cuuid")){
              store.createIndex("cuuid", "cuuid", { unique: false });
            }
          }
          // TRANSFORMER CONSTRUCTION
          if(db.objectStoreNames.contains("transformer_constructions")){
            const store = tx.objectStore("transformer_constructions")
            if (!store.indexNames.contains("cuuid")){
              store.createIndex("cuuid", "cuuid", { unique: false });
            }
          }
        }
      },
      
    });
  }

  return dbPromise;
}
