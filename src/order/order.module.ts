import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema, ProductInCart, ProductInCartSchema } from './order.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
            { name: ProductInCart.name, schema: ProductInCartSchema }
        ]),
        UserModule,
        ProductModule
    ],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule { }
