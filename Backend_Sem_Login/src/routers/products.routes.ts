import { Router } from "express";
declare module "express";
import productCreateControllers from "../controllers/products/productCreate.controller";
import productDeleteSelfController from "../controllers/products/productDeleteSelf.controller";
import productListControllers from "../controllers/products/productList.controllers";
import productListOneController from "../controllers/products/productListOne.controller";
import productUpdateController from "../controllers/products/productUpdate.controller";

import isProductExistsMiddle from "../middlewares/isProductExists.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { productSchema } from "../schemas/product.schemas";
import isProductDeletedMiddle from "../middlewares/isProductDeleted.middleware";

const routes = Router();

routes.post("", validationMiddleware(productSchema), productCreateControllers);
routes.get("", productListControllers);
routes.get(
  "/:id",
  isProductExistsMiddle,
  isProductDeletedMiddle,
  productListOneController
);
routes.delete("/:id", isProductExistsMiddle, productDeleteSelfController);
routes.patch("/:id", isProductExistsMiddle, productUpdateController);

export default routes;
