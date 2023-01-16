import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  quantity: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ type: "date", nullable: true, default: null })
  deleted_at: Date;

  @ManyToOne((type) => User, (user) => user.products)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
