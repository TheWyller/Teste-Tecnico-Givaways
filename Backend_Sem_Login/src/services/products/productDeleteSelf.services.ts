import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";

const productDeleteSelfServices = async (id: string) => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOneBy({ id: id });

  if (!product) {
    throw new Error("This id not exists");
  }

  await productRepository.update(product.id, { deleted_at: new Date() });
  await productRepository.update(product.id, { status: false });

  return { message: "Product removed" };
};

export default productDeleteSelfServices;
