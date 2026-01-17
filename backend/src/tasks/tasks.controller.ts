import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskStatus } from './task.entity';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async create(@Body() dto: CreateTaskDto, @Request() req) {
        console.log('Full user object:', req.user);
        return this.tasksService.create(dto, req.user.userId);
    }

    @Get()
    findAll(@Request() req) {
        return this.tasksService.findAll(req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto,
        @Request() req,
    ) {
        return this.tasksService.update(id, dto, req.user.userId);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
        @Request() req,
    ) {
        return this.tasksService.updateStatus(id, status, req.user.userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.tasksService.remove(id, req.user.userId);
    }
}
