import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { Product } from 'src/product/product.schema';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel(Order.name) private readonly order_model: Model<OrderDocument>
    ) { }

    async addToCart(product: Product) {
        
    }
    async createOrder() {}
    
    async findAllOrdersForUser() {}
}
