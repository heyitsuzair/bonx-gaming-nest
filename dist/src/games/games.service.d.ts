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
import { CreateGameDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class GamesService {
    private readonly gamesModel;
    private jwtService;
    constructor(gamesModel: Model<CreateGameDto>, jwtService: JwtService);
    create(body: CreateGameDto, token: any): Promise<{
        msg: string;
    }>;
    readGame(id: string): Promise<import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    readGames(): Promise<(import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readOwnerGames(token: any): Promise<(import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    delete(id: string, token: any): Promise<{
        msg: string;
    }>;
    update(body: CreateGameDto, token: any, id: string): Promise<{
        msg: string;
    }>;
    search(category: string, query: string): Promise<(import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
