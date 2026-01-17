import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsDateString,
} from 'class-validator';
import { TaskPriority, TaskStatus } from '../task.entity';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    // ✅ Due Date
    @IsOptional()
    @IsDateString()
    dueDate?: string; // ISO string from frontend
}
