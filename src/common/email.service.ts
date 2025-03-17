import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { createTransport } from 'nodemailer';
import path from 'path';

@Injectable()
export class EmailService {
    constructor(private configService: ConfigService) { }

    transporter = createTransport({
        host: this.configService.get<string>('EMAIL_HOST'),
        secure: this.configService.get<string>('NODE_ENV') === 'production',
        auth: {
            user: this.configService.get<string>('EMAIL_USER'),
            pass: this.configService.get<string>('EMAIL_PASS'),
        },
    });

    parseMailFile(filePath: string, code: string) {
        const file = readFileSync(filePath).toString();
        return file.replace('{{code}}', code);
    }

    async sendPasswordResetMail(email: string, code: string): Promise<boolean> {
        const pathToEmail = path.join(__dirname, "../../templates/reset_password.html");
        try {
            await this.transporter.sendMail({
                from: '"Kolzsticks Solutions"',
                to: email,
                subject: 'Password Reset',
                html: this.parseMailFile(pathToEmail, code),
            });
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }

    }
}
