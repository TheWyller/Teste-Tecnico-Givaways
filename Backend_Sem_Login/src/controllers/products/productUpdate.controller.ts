import { Request, Response } from "express";
declare module "express";
import productUpdateServices from "../../services/products/productUpdate.services";

const productUpdateController = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request.params.id;
    const { name, category, quantity, status } = request.body;
    const updatedProduct = await productUpdateServices(
      { name, category, quantity, status },
      id
    );
    return response
      .status(200)
      .json({ message: "Product updated", userdata: updatedProduct });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default productUpdateController;
