import { Response, Request } from "express";
import productCreateService from "../../services/products/productCreate.services";

const productCreateControllers = async (
  request: Request,
  response: Response
) => {
  try {
    const userData = request.body;
    const userId = request.userId;
    const newProduct = await productCreateService(userData, userId);
    return response.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
  }
};

export default productCreateControllers;
