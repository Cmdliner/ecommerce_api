import { IsEnum, IsInt, IsNumber, IsObject, IsString } from "class-validator";
import { ProductCategories, SizeEnum } from "src/common/lib";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsInt()
    stock: number;

    @IsEnum(ProductCategories)
    category: string;

    @IsString()
    description: string;

    @IsNumber()
    rating: number;

    @IsEnum(SizeEnum)
    size: string;

    @IsNumber()
    price: number;
    
    @IsString()
    sku: string;

    @IsNumber()
    weight: number;

    @IsObject()
    dimensions: {
        width: number;
        height: number;
        depth: number;
    }

}

export class UpdateProductDto extends CreateProductDto { }