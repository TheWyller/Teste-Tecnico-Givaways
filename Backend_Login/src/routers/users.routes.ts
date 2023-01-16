import { Router } from "express";
import userCreateControllers from "../controllers/users/userCreate.controller";
import userDeleteSelfController from "../controllers/users/userDeleteSelf.controller";
import userListControllers from "../controllers/users/userList.controllers";
import userListOneController from "../controllers/users/userListOne.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import isUserExistsMiddle from "../middlewares/isUserExists.middleware";
import emailCheckMiddle from "../middlewares/emailCheck.middleware";

import authUserMiddle from "../middlewares/authUser.middleware";
import isOwnMiddle from "../middlewares/isOwn.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { userSchema } from "../schemas/user.schemas";
import isAdmMiddle from "../middlewares/isAdm.middleware";

const routes = Router();

routes.post(
  "",
  validationMiddleware(userSchema),
  emailCheckMiddle,
  userCreateControllers
);
routes.get("", authUserMiddle, isAdmMiddle, userListControllers);
routes.get(
  "/:id",
  authUserMiddle,
  isUserExistsMiddle,
  isOwnMiddle,
  userListOneController
);
routes.delete(
  "/:id",
  authUserMiddle,
  isUserExistsMiddle,
  isOwnMiddle,
  userDeleteSelfController
);
routes.patch(
  "/:id",
  authUserMiddle,
  isUserExistsMiddle,
  isOwnMiddle,
  userUpdateController
);

export default routes;
