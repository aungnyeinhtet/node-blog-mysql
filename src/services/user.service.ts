import * as userRepository from "../repositories/user.repository";
import { Conflict } from "http-errors";
import { RegisterInput } from "../dto/register";
import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../config/constants";

export const findByPhoneOrFail = async (phone: string) => {
  return await userRepository.findByPhone(phone);
};

export const findByPhone = async (phone: string) => {
  return await userRepository.findByPhone(phone);
};
export const checkPatientExistsWithPhone = async (phone: string) => {
  const user = await findByPhone(phone);

  if (user.rows.length !== 0) {
    throw new Conflict(`User with phone ${phone} already exists`);
  }
};

export const create = async ({ fullname, phone, password }: RegisterInput) => {
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
  const results: any = await userRepository.create({
    fullname,
    phone,
    password: hashedPassword,
  });
  return results.rows[0].id ?? null;
};
