import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { SchemaTimestampOpts } from 'src/common/lib';
import { ProductInCart } from 'src/order/order.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: SchemaTimestampOpts })
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
    reset_pwd_otp: string;

    @Prop({ expires: 10 * 6 * 1000 })
    email_verification_otp: string;

    @Prop({type: [ProductInCart], ref: 'Product'})
    cart: ProductInCart[];
}

export const UserSchema = SchemaFactory.createForClass(User);
