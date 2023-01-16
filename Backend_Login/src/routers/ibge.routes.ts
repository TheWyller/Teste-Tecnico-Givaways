import { Router } from "express";
import getMunicipiosControllers from "../controllers/ibge/getMunicipios.controller";

const routes = Router();

routes.get("", getMunicipiosControllers);
routes.get("/:id", getMunicipiosControllers);

export default routes;
