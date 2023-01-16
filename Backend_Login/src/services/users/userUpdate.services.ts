import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcryptjs";
import { IUserUpdate } from "../../interfaces/user";

const userUpdateServices = async (
  { firstName, lastName, password: pass, email, phone }: IUserUpdate,
  id: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const account = users.find((elem) => elem.id === id);

  if (firstName !== undefined) {
    await userRepository.update(account!.id, { firstName: firstName });
  }

  if (lastName !== undefined) {
    await userRepository.update(account!.id, { lastName: lastName });
  }

  if (pass !== undefined) {
    await userRepository.update(account!.id, {
      password: await hash(pass, 10),
    });
  }
  if (email !== undefined) {
    await userRepository.update(account!.id, { email: email });
  }
  if (phone !== undefined) {
    await userRepository.update(account!.id, { phone: phone });
  }

  await userRepository.update(account!.id, { updated_at: new Date() });

  const updatedUserRepository = AppDataSource.getRepository(User);
  const updatedUsers = await updatedUserRepository.find();
  const accountUpdated = updatedUsers.find((elem) => elem.id === id);

  const { password, ...userNoPassword } = accountUpdated!;

  return userNoPassword;
};

export default userUpdateServices;
