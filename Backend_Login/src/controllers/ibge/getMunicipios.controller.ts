import { Response, Request } from "express";
import getMunicipiosServices from "../../services/ibge/getMunicipios.services";

const getMunicipiosControllers = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request.params.id;
    const newProduct = await getMunicipiosServices();
    return response.status(200).json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
  }
};

export default getMunicipiosControllers;
