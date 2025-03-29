import { Body, Controller, Headers, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddToCartDto, CreateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {

    constructor(
        private readonly order_service: OrderService
    ) { }

    @Post()
    @HttpCode(200)
    async createOrder(@Headers('x-user') user_header: UserHeader, @Body() body: CreateOrderDto) {
        await this.order_service.createOrder(user_header.sub, body);
        return { message: 'Order created successfully' }
    }

    @Post('add-to-cart')
    @HttpCode(200)
    async addProductToCart(@Headers('x-user') user_header: UserHeader, @Body() body: AddToCartDto) {
        const userId = user_header.sub;
        await this.order_service.addToCart(userId, body.product_id, body.quantity);

        return { message: 'Item added to cart successfully' };
    }
}
