import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UploadedImageTransformPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // !todo => Validate file & Upload to cloudinary
        return value;
    }
    
}