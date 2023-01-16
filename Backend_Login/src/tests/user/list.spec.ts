import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";
import { IUserLogin, IUserRequest } from "../../interfaces/user";
import { createAdm } from "../../helpers";

describe("Teste para metodo GET em /users", () => {
  let connection: DataSource;

  let admUser: IUserLogin = {
    email: "root@root.com",
    password: "1234",
  };

  let testUser1: IUserRequest = {
    firstName: "Wyller",
    lastName: "Fernandes",
    phone: "41999999999",
    email: "wyller@kenzie.com",
    password: "123456",
  };

  let testUser2: IUserRequest = {
    firstName: "Wyller2",
    lastName: "Fernandes2",
    phone: "419999999992",
    email: "wyller2@kenzie.com",
    password: "123456",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (res) => {
        connection = res;
        await createAdm();
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(testUser1);
    await request(app).post("/users").send(testUser2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Tentando listar todos usuários sem ser ADM", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Tentando listar todos usuários como ADM", async () => {
    const admResponse = await request(app).post("/login").send(admUser);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${admResponse.body.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
