import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
