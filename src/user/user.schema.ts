import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @IsEmail()
    @Prop({ required: true, index: true, unique: true })
    email: string;

    @IsNotEmpty()
    @Prop({ required: true, index: true, unique: true })
    username: string;

    @IsNotEmpty()
    @Prop({ required: true })
    password: string;

    @Prop({ expires: 10 * 60 * 1000 })
    resetPwdOtp: string;

    @Prop({expires: 10 * 6 * 1000 })
    emailVerificationOtp: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
