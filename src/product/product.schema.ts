import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { min } from "class-validator";
import { HydratedDocument, Types } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true, text: true })
    name: string;

    @Prop({ min: 0, default: 0 })
    stock: number;

    @Prop({ required: true, enum: [] })
    category: string

    @Prop({ required: true, text: true })
    description: string;

    @Prop({ required: true })
    seller: Types.ObjectId;

    @Prop()
    deleted_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);