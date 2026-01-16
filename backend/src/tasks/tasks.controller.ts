import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { TaskStatus } from './task.entity';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(
        @Body() dto: CreateTaskDto,
        @GetUser('id') userId: string,
    ) {
        return this.tasksService.create(dto, userId);
    }

    @Get()
    findAll(@GetUser('id') userId: string) {
        return this.tasksService.findAll(userId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto,
        @GetUser('id') userId: string,
    ) {
        return this.tasksService.update(id, dto, userId);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
        @GetUser('id') userId: string,
    ) {
        return this.tasksService.updateStatus(id, status, userId);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @GetUser('id') userId: string,
    ) {
        return this.tasksService.remove(id, userId);
    }
}
