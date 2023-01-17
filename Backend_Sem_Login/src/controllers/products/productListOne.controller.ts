import { Request, Response } from "express";
declare module "express";
import productListOneServices from "../../services/products/productListOne.services";

const productListOneController = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request.params.id;
    const product = await productListOneServices(id);
    return response.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default productListOneController;
