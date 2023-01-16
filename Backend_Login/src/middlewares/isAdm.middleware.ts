import { Request, Response, NextFunction } from "express";

export const isAdmMiddle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkAdm = req.isAdm;

    if (checkAdm) {
      next();
    } else {
      return res.status(401).json({ message: "You're not the ADM" });
    }
  } catch (error) {
    return res.status(401).json({ message: "You're not the ADM" });
  }
};

export default isAdmMiddle;
