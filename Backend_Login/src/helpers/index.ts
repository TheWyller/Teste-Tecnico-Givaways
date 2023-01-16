import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import "dotenv/config";

export const createAdm = async () => {
  try {
    const password = process.env.ADM_PASSWORD || "123456";

    const admUserRepository = AppDataSource.getRepository(User);

    const isAdmExists = await admUserRepository.findOneBy({
      email: "root@root.com",
    });
    if (!isAdmExists) {
      await admUserRepository.save({
        firstName: "root",
        lastName: "Adm",
        phone: "41999999999",
        email: "root@root.com",
        password: await hash(password, 10),
        created_at: new Date(),
        updated_at: new Date(),
        isAdm: true,
      });
      console.log("AdmUser Created");
    } else {
      console.log("AdmUser Already Created");
    }
  } catch (error) {
    console.log("Repository not ready yet");
  }
};
