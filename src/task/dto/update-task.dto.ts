import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UpdateTaskDto {
  
  @PrimaryGeneratedColumn()
  id: number;
 
  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly due_date: Date;

  @IsOptional()
  @IsString()
  readonly assignee: string;

  @IsOptional()
  @IsString()
  readonly status: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
