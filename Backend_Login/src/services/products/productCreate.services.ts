import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/products.entity";
import { User } from "../../entities/user.entity";

import { IProductRequest } from "../../interfaces/product";

const productCreateService = async (
  productData: IProductRequest,
  userId: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const productsRepository = AppDataSource.getRepository(Product);
  const findUser = await userRepository.findOneBy({ id: userId });

  const product = new Product();
  product.name = productData.name;
  product.category = productData.category;
  if (productData.status !== undefined) {
    product.status = productData.status;
  }
  product.quantity = productData.quantity;
  product.created_at = new Date();
  product.updated_at = new Date();
  product.user = findUser!;

  productsRepository.create(product);
  await productsRepository.save(product);

  const { user, ...allInfo } = product;

  const { id, ...rest } = user;

  const newproduct = { ...allInfo, user: id };

  return newproduct;
};

export default productCreateService;
