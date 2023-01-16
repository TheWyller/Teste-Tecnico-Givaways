import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userDeleteSelfServices = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const account = users.find((elem) => elem.id === id);
  await userRepository.delete(account!.id);

  return { message: "Account removed" };
};

export default userDeleteSelfServices;
