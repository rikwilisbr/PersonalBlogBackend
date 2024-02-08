import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

type UserTypes = {
    email: string,
    hashedPassword: string
}

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds)
    }

    async comparePass(password: string, hash: string ) {
        return await bcrypt.compare(password, hash)
    }

    async signToken(args:{ id: string, email: string }){
        const payload = args

        return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET })
    }

    async register(dto: AuthDto) {
        const { email, password } = dto

        // verify if email already exists
        const foundUser = await this.prisma.user.findUnique({ where: { email } })
        if(foundUser) {
            throw new BadRequestException('email already in use')
        }

        // hash the password
        const hashedPassword = await this.hashPassword(password)


        // create new user on database
        const payload: UserTypes = {
            email: email,
            hashedPassword: hashedPassword 
        }

        await this.prisma.user.create({
            data: payload
        })

        // send response to client
        return { message: 'Admin registred successfully' }
    }

    async login(dto: AuthDto, req: Request, res: Response) {
        const { email, password } = dto

         // verify if email already exists
         const foundUser = await this.prisma.user.findUnique({ where: { email } })
         if(!foundUser) {
             throw new BadRequestException('Invalid email or password')
         }

        //verify if password match with email
        const isMatch = await this.comparePass(password, foundUser.hashedPassword)
        if(!isMatch){
            throw new BadRequestException('Invalid email or password')
        }

        //sign jwt
        const token = await this.signToken({id: foundUser.id, email: foundUser.email})

        if(!token) {
            throw new ForbiddenException();
        }
        
        //send response to client
        return res.cookie('token', token, { httpOnly: true }).send({message: 'Admin logged successfully'})
    }

    async logout(req: Request, res: Response) {
        res.clearCookie('token')
        return res.send({message: 'Admin logged out successfully'})
    }
}
