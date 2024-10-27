import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async profileInfo(id: Types.ObjectId): Promise<UserDocument> {
        return this.userModel.findById(id);
    }
    async findOne(email: string): Promise<UserDocument> {
        const user  = this.userModel.findOne({ email });
        if(!user) throw new NotFoundException("User not found!");

        return user
    }

    async createUser(email: string, passsword: string): Promise<UserDocument> {
        const userExists = await this.userModel.findOne({ email });
        if (userExists) throw new BadRequestException("User with that email already exists");

        const hashedPassword = await hash(passsword, 10);
        const user = this.userModel.create({ email, password: hashedPassword });
        return user;
    }
}
