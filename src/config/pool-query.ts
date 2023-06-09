import assert from "assert";
import pool from "./database";
const poolQuery = async (queryString: string, values?: any) => {
  const con = await pool.connect();
  try {
    assert(queryString);
    assert(typeof queryString === "string");
    if (!values) {
      values = [];
    }
    const result = await con.query(queryString, values);
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    con.release();
  }
};

export default poolQuery;
