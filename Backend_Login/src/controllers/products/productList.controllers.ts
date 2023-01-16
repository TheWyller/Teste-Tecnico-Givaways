import { Response, Request } from "express";
import productlistService from "../../services/products/productList.services";

const productListControllers = async (request: Request, response: Response) => {
  try {
    const userId = request.userId;
    const listProduct = await productlistService(userId);
    return response.json(listProduct);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default productListControllers;
