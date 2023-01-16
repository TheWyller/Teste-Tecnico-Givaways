import { Router } from "express";
import productCreateControllers from "../controllers/products/productCreate.controller";
import productDeleteSelfController from "../controllers/products/productDeleteSelf.controller";
import productListControllers from "../controllers/products/productList.controllers";
import productListOneController from "../controllers/products/productListOne.controller";
import productUpdateController from "../controllers/products/productUpdate.controller";

import authUserMiddle from "../middlewares/authUser.middleware";
import isProductExistsMiddle from "../middlewares/isProductExists.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { productSchema } from "../schemas/product.schemas";
import isProductOwnMiddle from "../middlewares/isProductOwn.middleware";
import isProductDeletedMiddle from "../middlewares/isProductDeleted.middleware";

const routes = Router();

routes.post(
  "",
  authUserMiddle,
  validationMiddleware(productSchema),
  productCreateControllers
);
routes.get("", authUserMiddle, productListControllers);
routes.get(
  "/:id",
  authUserMiddle,
  isProductExistsMiddle,
  isProductOwnMiddle,
  isProductDeletedMiddle,
  productListOneController
);
routes.delete(
  "/:id",
  authUserMiddle,
  isProductExistsMiddle,
  isProductOwnMiddle,
  productDeleteSelfController
);
routes.patch(
  "/:id",
  authUserMiddle,
  isProductExistsMiddle,
  isProductOwnMiddle,
  productUpdateController
);

export default routes;
