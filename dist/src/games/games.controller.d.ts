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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateGameDto, UpdateGameDto } from './dto';
import { GamesService } from './games.service';
import { Request } from 'express';
export declare class GamesController {
    private gamesService;
    constructor(gamesService: GamesService);
    create(body: CreateGameDto, req: Request): Promise<{
        msg: string;
    }>;
    readGames(): Promise<(import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readOwnerGames(req: Request): Promise<(import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    search(category: string, query: string): Promise<(import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    readGame(id: string): Promise<import("mongoose").Document<unknown, any, CreateGameDto> & CreateGameDto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string, req: Request): Promise<{
        msg: string;
    }>;
    update(body: UpdateGameDto, id: string, req: Request): Promise<{
        msg: string;
    }>;
}
