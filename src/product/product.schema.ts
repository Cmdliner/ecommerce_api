import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ProductCategories, SchemaTimestampOpts, SizeEnum } from "src/common/lib";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: SchemaTimestampOpts })
export class Product {
    @Prop({ required: true, text: true })
    name: string;

    // @Prop({ required: true })
    // image: string;

    @Prop({ min: 0, default: 0 })
    stock: number;

    @Prop({ required: true, enum: ProductCategories })
    category: string

    @Prop({ required: true, text: true })
    description: string;

    @Prop({  min: 0, max: 5 })
    rating: number;

    @Prop({ required: true, enum: SizeEnum })
    size: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    sku: string;

    @Prop({ required: false })
    weight: number;

    @Prop({ required: false, type: Types.Map })
    dimensions: {
        width: number;  // cm
        height: number; // cm
        depth: number;  // cm
    }

    @Prop()
    deleted_at: Date;
}

export type TProduct = Product;

export const ProductSchema = SchemaFactory.createForClass(Product);