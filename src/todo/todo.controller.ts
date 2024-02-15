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
  createTodo(@Body() todoDto: CreateTodoDto): TodoEntity {
    return this.todoService.createTask(todoDto);
  }

  @Get()
  getAllTodos(): TodoEntity[] {
    return this.todoService.getAllTasks();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): TodoEntity {
    return this.todoService.getTaskById(id);
  }

  @Get('status/:status')
  getTodosByStatus(@Param('status') status: string): TodoEntity[] {
    return this.todoService.getTasksByStatus(status);
  }

  @Put(':id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body('status') changeStatusDto: ChangeStatusDto,
  ): TodoEntity {
    return this.todoService.updateTaskStatus(id, changeStatusDto);
  }

  @Delete(':id')
  deleteTodoById(@Param('id') id: string): TodoEntity {
    return this.todoService.deleteTaskById(id);
  }
}
