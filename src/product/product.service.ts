import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./product.schema";
import { Model, Types } from "mongoose";
import { NotFoundException } from "@nestjs/common";

export class ProductService {

    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) { }

    async search(q: string): Promise<ProductDocument[]> {
        const products = await this.productModel.find({
            $or: [
                { $text: { $search: q } },
                { name: { $regex: q, $options: 'i' } }
            ]
        }).sort({ score: { $meta: "textScore" } }).limit(10);
        return products;
    }

    async find(name: string): Promise<ProductDocument[]> {
        return this.productModel.find({ name, deleted_at: { $exists: false } });
    }

    async findByCategory(category: string): Promise<ProductDocument[]> {
        return this.productModel.find({ category, deleted_at: { $exists: false } });
    }

    async findOne(id: Types.ObjectId): Promise<ProductDocument> {
        const product = this.productModel.findOne({ _id: id, deleted_at: { $exists: false } });
        if (!product) throw new NotFoundException("Product not found");
        return product;
    }

    async getAllProductsBySeller(seller: Types.ObjectId): Promise<ProductDocument[]> {
        return this.productModel.find({ seller });
    }

    async createProduct(product: Omit<Product, 'deleted_at'>): Promise<ProductDocument> {
        return this.productModel.create({
            name: product.name,
            seller: product.seller,
            description: product.description,
            stock: product.stock
        });
    }

    async updateProduct(id: Types.ObjectId, prod: Omit<Product, 'seller' | 'deleted_at'>) {
        const product = await this.findOne(id);
        if (!product) throw new NotFoundException("Product not found");

        if (prod.name) product.name = prod.name;
        if (prod.description) product.description = prod.description;
        if (prod.category) product.category = prod.category;
        if (prod.stock) product.stock = prod.stock;
        await product.save();

        return product;
    }

    async deleteProduct(id: Types.ObjectId) {
        const product = await this.findOne(id);
        if (!product) throw new NotFoundException("Product not found");

        const now = new Date();
        product.deleted_at = now;

        await product.save();
        return product;
    }
}