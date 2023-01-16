import { Request, Response } from "express";
import userLoginServices from "../../services/users/userLogin.services";

const userLoginController = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const token = await userLoginServices({ email, password });

    return response.status(200).json(token);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default userLoginController;
