import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const isUserExistsMiddle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    const isUserExists = users.find((elem) => elem.id === id);

    if (isUserExists === undefined) {
      return res.status(404).json({ message: "User not exist" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "User not exist" });
  }
};

export default isUserExistsMiddle;
