import { Response, Request } from "express";
export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;
};
