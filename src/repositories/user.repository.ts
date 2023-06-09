import { RegisterInput } from "../dto/register";
import poolQuery from "../config/pool-query";
import { InternalServerError } from "http-errors";

export const findByPhone = async (phone: string) => {
  try {
    const user = await poolQuery(
      `SELECT id, phone, password FROM users WHERE phone = '${phone}' `
    );
    return user;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Database Error");
  }
};
export const create = async ({ fullname, phone, password }: RegisterInput) => {
  try {
    await poolQuery(
      "INSERT INTO users (fullname, phone,password) VALUES ($fullname, $phone , $password) returning id",
      [fullname, phone, password]
    );
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Database Error");
  }
};
