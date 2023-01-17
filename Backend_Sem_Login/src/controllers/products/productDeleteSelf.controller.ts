import { Request, Response } from "express";
declare module "express";
import productDeleteSelfServices from "../../services/products/productDeleteSelf.services";

const productDeleteSelfController = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request.params.id;
    const message = await productDeleteSelfServices(id);
    return response.status(200).json(message);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default productDeleteSelfController;
