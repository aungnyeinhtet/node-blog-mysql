import { Response, Request } from "express";
import { registerInputSchema } from "../dto/register";
import { validate } from "../utils/validation";
export const register = async (req: Request, res: Response) => {
  const { name, phone, password } = await validate(
    req.body,
    registerInputSchema
  );
  res.json({
    data: {
      name,
      phone,
      password,
    },
  });
};
