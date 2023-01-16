import "reflect-metadata";
import express from "express";
import productsRoutes from "./routers/products.routes";
import ibgeRoutes from "./routers/ibge.routes";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());
app.use("/products", productsRoutes);
app.use("/ibge", ibgeRoutes);

export default app;
