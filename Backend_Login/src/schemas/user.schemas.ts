import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/user";

const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phone: yup
    .string()
    .min(10, "O Telefone deve conter no mínimo 8 digitos mais o DDD")
    .required(),
});

export { userSchema };
