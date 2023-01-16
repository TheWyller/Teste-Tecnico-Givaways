import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";

const productListOneServices = async (id: string) => {
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOneBy({ id });
  if (!product) {
    throw new Error("This id not exists");
  }
  return product;
};

export default productListOneServices;
