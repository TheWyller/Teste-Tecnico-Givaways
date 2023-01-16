import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";
import { IUserLogin, IUserRequest } from "../../interfaces/user";

describe("Teste para metodo PATCH em /users/:id", () => {
  let connection: DataSource;

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

  test("Tentando atualizar um usuário", async () => {
    const loginResponse = await request(app).post("/login").send(user1);
    const responsePatch = await request(app)
      .patch(`/users/${response1.body.id}`)
      .send(testUser2)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const responseGet = await request(app)
      .get(`/users/${response1.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body).toHaveProperty("message");

    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseGet.body.id,
        firstName: testUser2.firstName,
        lastName: testUser2.lastName,
        phone: testUser2.phone,
        email: testUser2.email,
        created_at: responseGet.body.created_at,
        updated_at: responseGet.body.updated_at,
      })
    );
  });

  test("Tentando atualizar um usuário que não existe", async () => {
    const response = await request(app).get(`/users/1`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });
});
