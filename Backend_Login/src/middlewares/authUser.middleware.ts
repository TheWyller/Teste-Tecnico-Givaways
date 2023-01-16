import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authUserMiddle = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        request.userId = decoded.id;
        request.isAdm = decoded.isAdm;
        next();
      }
    );
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
};
export default authUserMiddle;
