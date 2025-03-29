import { IsInt, IsMongoId, IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";
import { ProductInCart } from "./order.schema";
import { Types } from "mongoose";

export class CreateOrderDto {

    @MinLength(1)
    products: ProductInCart[];

    @IsNotEmpty()
    @IsString()
    billng_address: string;

    shipping_address?: string;
}

export class AddToCartDto {

    @IsMongoId()
    product_id: Types.ObjectId;

    @IsPositive()
    @IsInt()
    quantity: number;
}