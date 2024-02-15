import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title should be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description should be a string' })
  description: string;

  @IsNotEmpty({ message: 'Status should not be empty' })
  @IsString({ message: 'Status should be a string' })
  status: string;
}

export class ChangeStatusDto {
  @IsNotEmpty({ message: 'ID should not be empty' })
  @IsString({ message: 'ID should be a string' })
  id: string;

  @IsNotEmpty({ message: 'Status should not be empty' })
  @IsString({ message: 'Status should be a string' })
  status: string;
}
