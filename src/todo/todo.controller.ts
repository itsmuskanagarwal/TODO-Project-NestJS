import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, ChangeStatusDto } from './dto/create-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTask(@Body() todoDto: CreateTodoDto): Promise<TodoEntity> {
    console.log("in controller",todoDto)
    const createdTask = await this.todoService.createTask(todoDto);
    return createdTask;
  }

  @Get()
  async getAllTasks(): Promise<TodoEntity[]> {
    const allTasks = await this.todoService.getAllTasks();
    return allTasks;
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TodoEntity | null> {
    const task = await this.todoService.getTaskById(id);
    return task;
  }

  @Get('status/:status')
  async getTasksByStatus(@Param('status') status: string): Promise<TodoEntity[]> {
    const tasks = await this.todoService.getTasksByStatus(status);
    return tasks;
  }

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
  ): Promise<TodoEntity> {
    const updatedTask = await this.todoService.updateTaskStatus(id, changeStatusDto.status);
    return updatedTask;
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: string): Promise<TodoEntity | null> {
    const deletedTask = await this.todoService.deleteTaskById(id);
    return deletedTask;
  }
}
