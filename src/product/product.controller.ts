import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { ProductService } from './product.service';
import { Types } from 'mongoose';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @HttpCode(201)
    @Post('')
    async createProduct(@Body() body: CreateProductDto) {
        await this.productService.createProduct({
            name: body.name,
            description: body.description,
            category: body.category,
            stock: body.stock,
            seller: new Types.ObjectId("09430940303") // !todo => Update this
        });
    }

    @Get('')
    async getProductsByCategory(@Body('category') category: string) {
        const products = await this.productService.findByCategory(category);
        return { success: true, products }
    }

    @Get('')
    async getProductById(@Param('id') id: Types.ObjectId) {
        const product = await this.productService.findOne(id);
        const { deleted_at, ...productToObj } = product.toObject();
        return productToObj;
    }

    @Patch('')
    async updateProduct(@Param('id') id: Types.ObjectId, @Body() body: UpdateProductDto) {
        const updatedProduct = await this.productService.updateProduct(id, body);
        const { deleted_at, ...updatedProductObj } = updatedProduct.toObject()
        return updatedProductObj;
    }

    @HttpCode(204)
    @Delete('')
    async deleteProduct(@Param('id') id: Types.ObjectId) {
        await this.productService.deleteProduct(id);
    }
}
