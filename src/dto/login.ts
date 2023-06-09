import Joi from "joi";
import validateMyanmarPhone from "../utils/validation";

interface LoginInput {
  phone: string;
  password: string;
}

export const loginInputSchema = Joi.object<LoginInput>({
  phone: Joi.string()
    .required()
    .custom((value, helpers) => validateMyanmarPhone(value)),
  password: Joi.string().required().trim(),
});
