import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    
    constructor(private userService: UserService, private jwtService: JwtService ) {}

    login(user: User): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email:user.email,
            nome:user.nome,
        };

        const jwtToken = this.jwtService.sign(payload);
        return{
            access_token:jwtToken,
            userID: user.id,
        }
    }

    async validateUser(email: string, senha: string) {
        const user = await this.userService.findByEmail(email);

        if(user){
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            
            if(isPasswordValid){
                return { ...user, senha: undefined };
            }
        }

        throw new Error('Email ou Senha estao incoretos');

    }
}
