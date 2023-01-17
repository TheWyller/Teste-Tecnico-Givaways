import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
declare module "uuid";
import { v4 as uuid } from "uuid";

@Entity("ibge")
export class IBGE {
  @PrimaryGeneratedColumn("uuid")
  readonly uuid: string;

  @Column({ unique: true })
  id: string;

  @Column({ unique: true })
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
