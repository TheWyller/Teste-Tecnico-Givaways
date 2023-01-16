import { Response, Request } from "express";
import userCreateService from "../../services/users/userCreate.services";

const userCreateControllers = async (request: Request, response: Response) => {
  try {
    const userData = request.body;
    const newUser = await userCreateService(userData);
    return response.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
  }
};

export default userCreateControllers;
