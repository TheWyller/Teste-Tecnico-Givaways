import { Response, Request } from "express";
import userlistService from "../../services/users/userList.services";

const userListControllers = async (request: Request, response: Response) => {
  try {
    const listUsers = await userlistService();
    return response.json(listUsers);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default userListControllers;
