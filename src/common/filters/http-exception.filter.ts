import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const timestamp = new Date().toISOString();
        const message = (exception.getResponse() as { message: string[] }).message ?? exception.message;
        
        response.status(status).json({ error: true, message, timestamp });
    }
}