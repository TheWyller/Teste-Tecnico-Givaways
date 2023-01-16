import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true,
      })
    : process.env.NODE_ENV === "production"
    ? new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: ["build/src/entities/*.js"],
        migrations: ["build/src/migrations/*.js"],
      })
    : new DataSource({
        type: "postgres",
        host: process.env.DB_HOST === "dockerdev" ? "postgres" : "localhost",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: true,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      });
