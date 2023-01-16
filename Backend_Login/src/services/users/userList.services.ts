import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";

const userlistService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const newArray = users.map((elem) => {
    const { password, ...allInfos } = elem;
    return allInfos;
  });

  return newArray;
};

export default userlistService;
