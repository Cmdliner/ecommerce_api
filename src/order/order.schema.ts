import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { SchemaTimestampOpts } from "src/common/lib";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
class OrderedProduct {
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product_id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    price: number;
}

export const OrderedProductSchema = SchemaFactory.createForClass(OrderedProduct);

@Schema({ timestamps: SchemaTimestampOpts })
export class Order {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    customer_id: Types.ObjectId;

    @Prop({ required: true })
    total_amount: number;

    @Prop({ type: [OrderedProductSchema], minlength: 0, required: true })
    products: OrderedProduct[];

    @Prop({ default: 'pending', enum: ['pending', 'processing', 'completed'] })
    status: string;

    @Prop({ required: true })
    shipping_address: string;

    @Prop({ required: true })
    billing_address: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);