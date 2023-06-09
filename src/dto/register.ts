import Joi from "joi";
import validateMyanmarPhone from "../utils/validation";

export interface RegisterInput {
  fullname: string;
  phone: string;
  password: string;
}

export const registerInputSchema = Joi.object<RegisterInput>({
  fullname: Joi.string().required().trim(),
  phone: Joi.string()
    .required()
    .custom((value, helpers) => validateMyanmarPhone(value)),
  password: Joi.string().required().trim(),
});
