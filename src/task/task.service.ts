// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';
// import { Task } from './schemas/task.schema';

// import { Query } from 'express-serve-static-core';
// import { User } from '../auth/schemas/user.schema';

// @Injectable()
// export class TaskService {
//   constructor(
//     @InjectModel(Task.name)
//     private taskModel: mongoose.Model<Task>,
//   ) {}

//   async findAll(query: Query): Promise<Task[]> {
//     const resPerPage = 2;
//     const currentPage = Number(query.page) || 1;
//     const skip = resPerPage * (currentPage - 1);

//     const keyword = query.keyword
//       ? {
//           title: {
//             $regex: query.keyword,
//             $options: 'i',
//           },
//         }
//       : {};

//     const tasks = await this.taskModel
//       .find({ ...keyword })
//       .limit(resPerPage)
//       .skip(skip);
//     return tasks;
//   }

//   async create(task: Task, user: User): Promise<Task> {
//     const data = Object.assign(task, { user: user._id });

//     const res = await this.taskModel.create(data);
//     return res;
//   }

//   async findById(id: string): Promise<Task> {
//     const isValidId = mongoose.isValidObjectId(id);

//     if (!isValidId) {
//       throw new BadRequestException('Please enter correct id.');
//     }

//     const task = await this.taskModel.findById(id);

//     if (!task) {
//       throw new NotFoundException('Task not found.');
//     }

//     return task;
//   }

//   async updateById(id: string, task: Task): Promise<Task> {
//     return await this.taskModel.findByIdAndUpdate(id, task, {
//       new: true,
//       runValidators: true,
//     });
//   }

//   async deleteById(id: string): Promise<Task> {
//     return await this.taskModel.findByIdAndDelete(id);
//   }
// }

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './schemas/task.schema';
import { User } from '../auth/schemas/user.schema';



@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(query: any): Promise<Task[]> {
    const resPerPage = 2;
    const currentPage = query.page ? Number(query.page) : 1;
    const skip = resPerPage * (currentPage - 1);

    const where = query.keyword ? { description: query.keyword } : {};

    const tasks = await this.taskRepository.find({
      where,
      take: resPerPage,
      skip,
    });
    
    return tasks;
  }

  async create(task: Task, user: User): Promise<Task> {
    task.user = user;
    return await this.taskRepository.save(task);
  }

  async findById(id: any): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  async updateById(id: string, updatedTask: Task): Promise<Task> {
    const existingTask = await this.findById(id);

    updatedTask.id = existingTask.id;

    return await this.taskRepository.save(updatedTask);
  }

  async deleteById(id: string): Promise<Task> {
    const taskToDelete = await this.findById(id);
    return await this.taskRepository.remove(taskToDelete);
  }
}

