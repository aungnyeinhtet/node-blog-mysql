import { validate } from "../utils/validation";
import { HttpStatus } from "../anh/types/http-status";
import * as userService from "../services/user.service";
import { Response, Request } from "express";
import { loginInputSchema } from "../dto/login";
import bcrypt from "bcrypt";
import { BadRequest } from "http-errors";
import { ACCESS_TOKEN_EXPIRES_IN } from "../config/constants";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { phone, password } = await validate(req.body, loginInputSchema);
  const user = await userService.findByPhoneOrFail(phone);
  let accessToken = null;
  if (user.rows.length !== 0) {
    const loginPassword = user.rows[0].password;
    const id = user.rows[0].id;
    const validatePassword = await bcrypt.compare(password, loginPassword);

    if (!validatePassword) throw new BadRequest("Invalid password");

    accessToken = jwt.sign({ sub: id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
  } else {
    throw new Error("Invalid Phone Number");
  }
  res.status(HttpStatus.OK).json({
    data: {
      accessToken,
      token: "Bearer",
      expiredAt: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
};
