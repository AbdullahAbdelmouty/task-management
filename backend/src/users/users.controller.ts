import {
    Controller,
    Get,
    Param,
    UseGuards,
    Request,
    ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from './user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get('me')
    async getMe(@Request() req) {
        const user = await this.usersService.findById(req.user.userId);
        if (!user) return null;

        // delete user.password;
        return user;
    }

    @Get()
    async getAllUsers(@Request() req) {
        if (req.user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('Admins only');
        }

        const users = await this.usersService.findAll();
        return users.map(user => {
            // delete user.password;
            return user;
        });
    }

    @Get(':id')
    async getUserById(@Param('id') id: string, @Request() req) {
        if (req.user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('Admins only');
        }

        const user = await this.usersService.findById(id);
        if (!user) return null;

        // delete user.password;
        return user;
    }
}