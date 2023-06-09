import { Response, Request } from "express";
import { registerInputSchema } from "../dto/register";
import { validate } from "../utils/validation";
import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, BCRYPT_SALT } from "../config/constants";
import { HttpStatus } from "../anh/types/http-status";
import * as userService from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  const { fullname, phone, password } = await validate(
    req.body,
    registerInputSchema
  );

  await userService.checkPatientExistsWithPhone(phone);

  const userId = await userService.create({ fullname, phone, password });

  let accessToken = null;
  if (userId) {
    accessToken = Jwt.sign({ sub: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
  }
  res.status(HttpStatus.OK).json({
    data: {
      accessToken,
      type: "Bearer",
      expiredAt: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
};
