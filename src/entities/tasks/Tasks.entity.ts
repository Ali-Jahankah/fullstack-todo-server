import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
} from "typeorm";
import { Level } from "../../enums/Level.enum";
import { Status } from "../../enums/Status.enum";
@Entity()
export class Tasks {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  title: string;

  @Column({
    type: "longtext",
  })
  description: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  date: string;

  @Column({
    type: "enum",
    enum: Level,
    default: Level.easy,
  })
  level: Level;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.new,
  })
  status: Status;
}
