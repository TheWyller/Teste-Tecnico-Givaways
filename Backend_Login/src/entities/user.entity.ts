import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./products.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ default: false })
  isAdm: boolean;

  @OneToMany((type) => Product, (product) => product.user, {
    eager: true,
    onDelete: "CASCADE",
  })
  products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
