import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Order, OrderDocument, ProductInCart, ProductInCartDocument } from "./order.schema";
import { Model, Types } from "mongoose";
import { CreateOrderDto } from "./order.dto";
import { ProductService } from "src/product/product.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name) private readonly order_model: Model<OrderDocument>,
        @InjectModel(ProductInCart.name) private readonly ordered_product_model : Model<ProductInCartDocument>,
        private userService: UserService,
        private productService: ProductService
    ) {}

    async createOrder(customer_id: Types.ObjectId, order: CreateOrderDto) {
        return this.order_model.create({
            ...order,
            total_amount: order.products.reduce((acc, p) => acc + p.price, 0),
            customer_id,
            status: 'processing'
        });
    }

    async addToCart(user_id: Types.ObjectId, product_id: Types.ObjectId, qty: number) {
        const user = await this.userService.findById(user_id);
        const product = await this.productService.findOne(product_id);

        if(qty > product.stock) throw new BadRequestException('Product stock lower than quantity selected');
        product.stock -= qty;

        const cartItem = await this.ordered_product_model.create({
            product_id: product._id,
            name: product.name,
            quantity: qty,
            price: product.price
        });

        user.cart.push(cartItem);
        await product.save();
        await user.save();
    }
}