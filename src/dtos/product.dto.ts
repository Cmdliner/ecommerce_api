export class CreateProductDto {
    name: string;
    stock: number;
    description: string;
    category: string;
}

export class UpdateProductDto extends CreateProductDto {}