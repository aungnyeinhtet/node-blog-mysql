import { Pool } from "pg";
import {
  databaseHost,
  databaseName,
  databasePassword,
  databaseUsername,
} from "./constants";
const pool = new Pool({
  host: databaseHost,
  user: databaseUsername,
  database: databaseName,
  password: databasePassword,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});
pool.connect((err, client, release) => {
  console.log("Database Server Address is ...", databaseHost);
  if (err) {
    console.error("Error acquiring client", err.stack);
    process.exit(-1);
  }
  console.log("Database Connected Successfully!");
  release();
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
