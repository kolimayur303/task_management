// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from '../auth/auth.module';
// import { TaskController } from './task.controller';
// import { TaskService } from './task.service';
// import { TaskSchema } from './schemas/task.schema';

// @Module({
//   imports: [
//     AuthModule,
//     MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
//   ],
//   controllers: [TaskController],
//   providers: [TaskService],
// })
// export class TaskModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { AuthModule } from '../auth/auth.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Task]), // Register Task entity with TypeOrmModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
