import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";
import { IUserLogin, IUserRequest } from "../../interfaces/user";

describe("Teste para metodo DELETE em /users/:id", () => {
  let connection: DataSource;

  let testUser1: IUserRequest = {
    firstName: "Wyller",
    lastName: "Fernandes",
    phone: "41999999999",
    email: "wyller@kenzie.com",
    password: "123456",
  };

  let user1: IUserLogin = {
    email: "wyller@kenzie.com",
    password: "123456",
  };

  let response1: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    response1 = await request(app).post("/users").send(testUser1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Tentando deletar um usuário", async () => {
    const loginResponse = await request(app).post("/login").send(user1);
    const responseDelete = await request(app)
      .delete(`/users/${response1.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(responseDelete.status).toEqual(200);
    expect(responseDelete.body).toHaveProperty("message");
  });

  test("Tentando deletar um usuário que não existe", async () => {
    const loginResponse = await request(app).post("/login").send(user1);
    const response = await request(app)
      .get(`/users/1`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });
});
