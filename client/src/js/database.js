import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("PUT to the database");
  console.log(content);
  const jateDb = await openDB("jate", 1);
  console.log(jateDb);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  console.log(store);
  const result = await store.put({ id: 1, content });

  console.log("🚀 - data put saved to the database", result);
};

export const getDb = async () => {
  console.log("GET all from database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const result = await store.getAll();

  console.log("🚀 all info from database", result);
  return result;
};

initdb();
