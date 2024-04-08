// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema({
//   timestamps: true,
// })
// export class User extends Document {
//   @Prop()
//   name: string;

//   @Prop({ unique: [true, 'Duplicate email entered'] })
//   email: string;

//   @Prop()
//   password: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);


import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  tasks: any;
}

