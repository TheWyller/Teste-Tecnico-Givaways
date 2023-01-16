import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userListOneServices = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const account = users.find((elem) => elem.id === id);

  return account;
};

export default userListOneServices;
