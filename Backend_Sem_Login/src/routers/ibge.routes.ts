import { Router } from "express";
declare module "express";
import getMunicipiosControllers from "../controllers/ibge/getMunicipios.controller";

const routes = Router();

routes.get("", getMunicipiosControllers);

export default routes;
