import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { password, ...rest } = registerDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersService.create({
            ...rest,
            password: hashedPassword,
        });

        const { password: _, ...safeUser } = user;
        return { user: safeUser, accessToken: this.jwtService.sign({ sub: user.id, role: user.role }) };
    }

    async login(loginDto: LoginDto) {
        const { emailOrPhone, password } = loginDto;

        const user = await this.usersService.findByEmailOrPhone(emailOrPhone);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, role: user.role };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        };
    }
}