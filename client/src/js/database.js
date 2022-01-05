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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const postDb = async (content) => {
  console.log("POST to the database");
  console.log(content);
  const jateDb = await openDB("jate", 1);
  console.log(jateDb);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  console.log(store);
  const request = store.add({ content });
  const result = await request;
  console.log("🚀 - data post saved to the database", result);
};

export const putDb = async (content) => {
  console.log("PUT to the database");
  console.log(content);
  const jateDb = await openDB("jate", 1);
  console.log(jateDb);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  console.log(store);
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log("🚀 - data put saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log("🚀 all info from database", result);
  return result;
};

initdb();
