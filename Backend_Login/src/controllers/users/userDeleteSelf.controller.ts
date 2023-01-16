import { Request, Response } from "express";
import userDeleteSelfServices from "../../services/users/userDeleteSelf.services";

const userDeleteSelfController = async (
  request: Request,
  response: Response
) => {
  try {
    const id = request.params.id;
    const user = await userDeleteSelfServices(id);
    return response.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default userDeleteSelfController;
