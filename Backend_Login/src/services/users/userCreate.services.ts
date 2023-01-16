import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

import { IUserRequest } from "../../interfaces/user";
import { hash } from "bcryptjs";

const userCreateService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const isEmailExists = users.find((elem) => elem.email === userData.email);

  if (isEmailExists) {
    throw new Error("This email already exists");
  }

  const user = new User();
  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.email = userData.email;
  user.phone = userData.phone;
  user.password = await hash(userData.password, 10);
  user.created_at = new Date();
  user.updated_at = new Date();

  userRepository.create(user);
  await userRepository.save(user);

  const { password, ...userNoPassword } = user;

  return userNoPassword;
};

export default userCreateService;
