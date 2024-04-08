// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';
// import { User } from '../../auth/schemas/user.schema';

// export enum Category {
//   ADVENTURE = 'Adventure',
//   CALSSICS = 'Classics',
//   CRIME = 'Crime',
//   FANTASY = 'Fantasy',
// }

// @Schema({
//   timestamps: true,
// })
// export class Task {
 
//   @Prop()
//   description: string;

//   @Prop()
//   readonly due_date: Date;
  
//   @Prop()
//   readonly assignee: string;

//   @Prop()
//   readonly status: string;

//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
//   user: User;
// }

// export const TaskSchema = SchemaFactory.createForClass(Task);


import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/schemas/user.schema';


export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  due_date: Date;

  @Column({ nullable: true })
  assignee: string;

  @Column({ nullable: true })
  status: string;

  @ManyToOne(() => User, user => user.tasks)
  user: User;
}

