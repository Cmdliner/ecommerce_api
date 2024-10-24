import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async profileInfo(id: Types.ObjectId): Promise<User> {
        return this.userModel.findById(id)
    }

    async createUser(email: string, passsword: string): Promise<User> {
        const hashedPassword = await hash(passsword, 10);
        const user = this.userModel.create({ email, password: hashedPassword });
        return user;
    }
}
