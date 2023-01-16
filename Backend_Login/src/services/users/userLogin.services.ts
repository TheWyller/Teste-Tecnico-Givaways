import { IUserLogin } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const userLoginServices = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((elem) => elem.email === email);

  if (!account) {
    throw new Error("Invalid email or password");
  }

  if (!(await compare(password, account.password))) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: account.id, isAdm: account.isAdm },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "24h",
    }
  );

  return { token: token };
};

export default userLoginServices;
