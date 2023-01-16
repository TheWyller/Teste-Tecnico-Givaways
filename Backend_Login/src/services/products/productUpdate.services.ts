import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { IProductUpdate } from "../../interfaces/product";

const productUpdateServices = async (
  { name, quantity, category, status }: IProductUpdate,
  id: string
) => {
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOneBy({ id });

  if (!product) {
    throw new Error("This id not exists");
  }

  if (name !== undefined) {
    await productRepository.update(product.id, { name: name });
  }
  if (quantity !== undefined) {
    await productRepository.update(product.id, { quantity: quantity });
  }

  if (category !== undefined) {
    await productRepository.update(product.id, { category: category });
  }
  if (status !== undefined) {
    await productRepository.update(product.id, { status: status });
  }

  await productRepository.update(product.id, { updated_at: new Date() });

  if (product.deleted_at !== null) {
    await productRepository.update(product.id, {
      deleted_at: new Date("0"),
    });
  }

  const updatedProductRepository = AppDataSource.getRepository(Product);
  const updatedProduct = await updatedProductRepository.findOneBy({ id });

  return updatedProduct;
};

export default productUpdateServices;
