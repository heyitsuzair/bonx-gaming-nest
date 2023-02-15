"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesModule = void 0;
const common_1 = require("@nestjs/common");
const games_service_1 = require("./games.service");
const games_controller_1 = require("./games.controller");
const config_1 = require("../../config");
const jwt_1 = require("@nestjs/jwt");
const model_1 = require("./model");
const mongoose_1 = require("@nestjs/mongoose");
let GamesModule = class GamesModule {
};
GamesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: config_1.ModelsName.games, schema: model_1.GamesModel }]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            }),
        ],
        providers: [games_service_1.GamesService],
        controllers: [games_controller_1.GamesController],
    })
], GamesModule);
exports.GamesModule = GamesModule;
//# sourceMappingURL=games.module.js.map