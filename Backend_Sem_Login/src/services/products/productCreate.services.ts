import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";

import { IProductRequest } from "../../interfaces/product";

const productCreateService = async (productData: IProductRequest) => {
  const productsRepository = AppDataSource.getRepository(Product);

  const product = new Product();
  product.name = productData.name;
  product.category = productData.category;
  if (productData.status !== undefined) {
    product.status = productData.status;
  }
  product.quantity = productData.quantity;
  product.created_at = new Date();
  product.updated_at = new Date();

  productsRepository.create(product);
  await productsRepository.save(product);

  return product;
};

export default productCreateService;
