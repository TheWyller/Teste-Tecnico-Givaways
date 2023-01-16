import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const isProductOwnMiddle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const isAdm = req.isAdm;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });

    const isProductExists = user!.products.find((elem) => elem.id === id);

    if (isProductExists || isAdm) {
      next();
    } else {
      return res.status(401).json({ message: "You're not the owner" });
    }
  } catch (error) {
    return res.status(401).json({ message: "You're not the owner" });
  }
};

export default isProductOwnMiddle;
