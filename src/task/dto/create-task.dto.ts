import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateTaskDto {
  
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly due_date: Date;

  @IsNotEmpty()
  @IsString()
  readonly assignee: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
