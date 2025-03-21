import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/product/product.dto';
import { ProductService } from './product.service';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/common/pipes/validation.pipe';
import { UploadedImageTransformPipe } from 'src/common/pipes/file-upload.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {

    constructor(private readonly product_service: ProductService) { }

    @Post()
    async createProduct(@UploadedFile('image', UploadedImageTransformPipe) _: string, @Body() body: CreateProductDto) {
        await this.product_service.createProduct({
            name: body.name,
            description: body.description,
            category: body.category,
            stock: body.stock,
            size: body.size,
            price: body.price,
            weight: body.weight,
            dimensions: body.dimensions,
            sku: body.sku
            // image: image
        });
    }

    @Get()
    async getProductsByCategory(@Body('category') category: string) {
        const products = await this.product_service.findByCategory(category);
        return { success: true, products }
    }

    @Get(':id')
    async getProductById(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId) {
        const product = await this.product_service.findOne(id);
        const { deleted_at, ...productToObj } = product.toObject();
        return productToObj;
    }

    @Patch(':id')
    async updateProduct(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId, @Body() body: UpdateProductDto) {
        const updatedProduct = await this.product_service.updateProduct(id, body);
        const { deleted_at, ...updatedProductObj } = updatedProduct.toObject()
        return updatedProductObj;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteProduct(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId) {
        await this.product_service.deleteProduct(id);
    }
}
