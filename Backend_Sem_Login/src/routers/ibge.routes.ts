declare module "express";
import { Router } from "express";
import getMunicipiosControllers from "../controllers/ibge/getMunicipios.controller";

const routes = Router();

routes.get("", getMunicipiosControllers);

export default routes;
