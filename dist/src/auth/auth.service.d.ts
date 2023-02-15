/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { LoginDto, SignupDTO, UpdateDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersModel;
    private jwtService;
    constructor(usersModel: Model<SignupDTO>, jwtService: JwtService);
    signup(body: SignupDTO): Promise<{
        msg: string;
    }>;
    login(body: LoginDto): Promise<{
        token: string;
        user_details: {
            name: string;
            email: string;
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(body: UpdateDTO, token: any): Promise<{
        msg: string;
    }>;
    generateJwt(user: any): string;
}
