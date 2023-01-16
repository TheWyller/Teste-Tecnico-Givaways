import { Request, Response } from "express";
import userListOneServices from "../../services/users/userListOne.services";

const userListOneController = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const user = await userListOneServices(id);
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

export default userListOneController;
