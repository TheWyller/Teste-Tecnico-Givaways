import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductRequest } from "../interfaces/product";

const productSchema: SchemaOf<IProductRequest> = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
  quantity: yup.string().required(),
  status: yup.boolean(),
});

export { productSchema };
