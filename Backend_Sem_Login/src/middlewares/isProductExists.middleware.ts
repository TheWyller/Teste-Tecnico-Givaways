import { Request, Response, NextFunction } from "express";
declare module "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/products.entity";

export const isProducExistsMiddle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      return res.status(404).json({ message: "Product not exist" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Product not exist" });
  }
};

export default isProducExistsMiddle;
