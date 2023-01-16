import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";

const productlistService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOneBy({ id: userId });

  return users!.products;
};

export default productlistService;
