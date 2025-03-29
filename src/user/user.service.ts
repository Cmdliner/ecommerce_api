import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async findById(user_id: Types.ObjectId) {
        const user = await this.userModel.findById(user_id);
        if(!user) throw new NotFoundException('User not found');
        return user;
    }

    async profileInfo(id: Types.ObjectId): Promise<UserDocument> {
        return this.findById(id);
    }

    async findOne(email: string): Promise<UserDocument> {
        const user = this.userModel.findOne({ email });
        if (!user) throw new NotFoundException('User not found!');

        return user;
    }

    async createUser(email: string, username: string, password: string): Promise<UserDocument> {
        const userExists = await this.userModel.findOne({
            $or: [{ email }, { username }],
        });
        if (userExists) throw new BadRequestException('Email or username in use');

        const hashedPassword = await hash(password, 10);
        const user = this.userModel.create({
            email,
            username,
            password: hashedPassword,
        });
        return user;
    }

    async updateResetPwdOtp(email: string, otp: string) {
        const user = await this.findOne(email);

        if (!user) throw new NotFoundException("User not found");
        user.reset_pwd_otp = otp;
        await user.save();

        return user;
    }
}
