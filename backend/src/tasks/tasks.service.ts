import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,
    ) { }

    async create(dto: CreateTaskDto, userId: string): Promise<Task> {
        const task = this.taskRepo.create({
            ...dto,
            userId,
            status: dto.status ?? TaskStatus.TODO,
        });

        return this.taskRepo.save(task);
    }

    async findAll(userId: string): Promise<Task[]> {
        return this.taskRepo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string, userId: string): Promise<Task> {
        const task = await this.taskRepo.findOne({
            where: { id, userId },
        });

        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    async update(
        id: string,
        dto: UpdateTaskDto,
        userId: string,
    ): Promise<Task> {
        const task = await this.findOne(id, userId);

        Object.assign(task, dto);
        return this.taskRepo.save(task);
    }

    async updateStatus(
        id: string,
        status: TaskStatus,
        userId: string,
    ): Promise<Task> {
        const task = await this.findOne(id, userId);
        task.status = status;
        return this.taskRepo.save(task);
    }

    async remove(id: string, userId: string): Promise<void> {
        const task = await this.findOne(id, userId);
        await this.taskRepo.remove(task);
    }
}
