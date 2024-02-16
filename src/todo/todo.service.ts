import {
  Injectable, BadRequestException, NotFoundException
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<TodoEntity>) {}

  async createTask(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    if (!createTodoDto.title || !createTodoDto.description || !createTodoDto.status) {
      throw new BadRequestException('Invalid data provided for creating a task.');
    }
    console.log("in service",createTodoDto)
    const newTodo: TodoEntity = {
      id: uuidv4(), 
      title: createTodoDto.title,
      description: createTodoDto.description,
      status: createTodoDto.status,
    };

    console.log("in service",newTodo)

    const createdTodo = new this.todoModel(newTodo);
    return createdTodo.save();
  }

  async getAllTasks(): Promise<TodoEntity[]> {
    const tasks = await this.todoModel.find().exec();
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException('No tasks found.');
    }
    return tasks;
  }

  async getTaskById(id: string): Promise<TodoEntity | null> {
    const task = await this.todoModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  async getTasksByStatus(status: string): Promise<TodoEntity[]> {
    if (!status) {
      throw new BadRequestException('Invalid status provided for querying tasks.');
    }
    const tasks = await this.todoModel.find({ status }).exec();
    return tasks;
  }

  async updateTaskStatus(id: string, status: string): Promise<TodoEntity | null> {
    if (!status) {
      throw new BadRequestException('Invalid status provided for updating the task.');
    }
    const task = await this.todoModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<TodoEntity | null> {
    const task = await this.todoModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }
}
