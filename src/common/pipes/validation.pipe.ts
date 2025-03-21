import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from "@nestjs/common";
import { isObjectIdOrHexString, Types } from "mongoose";


@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!isObjectIdOrHexString(value)) throw new UnprocessableEntityException("Invalid ObjectId");
        return Types.ObjectId.createFromHexString(value as string);
    }
    
}