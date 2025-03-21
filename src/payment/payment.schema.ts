import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
class PaymentTransaction {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    customer: Types.ObjectId;

    @Prop({ type: Number, min: 0, required: true })
    amount: number;

    @Prop({ type: Types.ObjectId, ref: 'Order' })
    order_id: Types.ObjectId;

    @Prop({ required: true, enum: ['pending', 'processing', 'completed', 'failed'] })
    status: string;


}

export const PaymentTransactionSchema = SchemaFactory.createForClass(PaymentTransaction);