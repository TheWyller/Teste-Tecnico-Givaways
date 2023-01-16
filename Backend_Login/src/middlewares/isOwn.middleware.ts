import { Request, Response, NextFunction } from "express";

export const isOwnMiddle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const isAdm = req.isAdm;

    if (id === req.userId || isAdm) {
      next();
    } else {
      return res.status(401).json({ message: "You're not the owner" });
    }
  } catch (error) {
    return res.status(401).json({ message: "You're not the owner" });
  }
};

export default isOwnMiddle;
