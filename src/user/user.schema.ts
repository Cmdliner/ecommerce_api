import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @IsEmail() 
  @Prop({ required: true, unique: true })
  email: string;

  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  username: string;

  @IsNotEmpty()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
