import "reflect-metadata";
import express from "express";
import productsRoutes from "./routers/products.routes";
import ibgeRoutes from "./routers/ibge.routes";
const app = express();

app.use(express.json());
app.use("/products", productsRoutes);
app.use("/ibge", ibgeRoutes);

export default app;
