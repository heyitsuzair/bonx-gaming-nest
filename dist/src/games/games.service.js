"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("../../config");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../../utils");
let GamesService = class GamesService {
    constructor(gamesModel, jwtService) {
        this.gamesModel = gamesModel;
        this.jwtService = jwtService;
    }
    async create(body, token) {
        const loggedInUser = this.jwtService.decode(token.split(' ')[1]);
        body.owner_id = loggedInUser.user_id;
        await this.gamesModel.create(body);
        return { msg: 'Game Added!' };
    }
    async readGame(id) {
        try {
            const game = await this.gamesModel
                .findById(id)
                .populate('owner_id', 'name');
            if (!game) {
                throw new common_1.NotFoundException('Game Not Found!');
            }
            return game;
        }
        catch (error) {
            throw new common_1.HttpException({ msg: 'Game Not Found' }, 404);
        }
    }
    async readGames() {
        const games = await this.gamesModel.find();
        return games;
    }
    async readOwnerGames(token) {
        const loggedInUser = this.jwtService.decode(token.split(' ')[1]);
        const owner_id = loggedInUser.user_id;
        const games = await this.gamesModel.find({ owner_id });
        return games;
    }
    async delete(id, token) {
        try {
            const game = await this.gamesModel.findById(id);
            if (!game) {
                throw new common_1.NotFoundException('Game Not Found!');
            }
            const loggedInUser = this.jwtService.decode(token.split(' ')[1]);
            if (!game.owner_id.equals(loggedInUser.user_id)) {
                throw new common_1.UnauthorizedException('Unauthorized!');
            }
            const banner = game.banner;
            const removeForwardSlashesBanner = banner.split('/');
            const pathBanner = removeForwardSlashesBanner[7] +
                '/' +
                removeForwardSlashesBanner[8] +
                '/' +
                removeForwardSlashesBanner[9].split('.')[0];
            const bannerPathWithoutPercent20 = decodeURIComponent(pathBanner);
            await (0, utils_1.deleteFile)(bannerPathWithoutPercent20);
            const game_file = game.game_file.filename;
            const removeForwardSlashesFile = game_file.split('/');
            const pathFile = removeForwardSlashesFile[7] +
                '/' +
                removeForwardSlashesFile[8] +
                '/' +
                removeForwardSlashesFile[9];
            const filepathWithoutPercent20 = decodeURIComponent(pathFile);
            await (0, utils_1.deleteFile)(filepathWithoutPercent20);
            game.delete();
            return { msg: 'Game Deleted!' };
        }
        catch ({ response }) {
            throw new common_1.HttpException({ msg: response.message }, response.statusCode);
        }
    }
    async update(body, token, id) {
        try {
            const game = await this.gamesModel.findById(id);
            if (!game) {
                throw new common_1.NotFoundException('Game Not Found!');
            }
            const loggedInUser = this.jwtService.decode(token.split(' ')[1]);
            if (!game.owner_id.equals(loggedInUser.user_id)) {
                throw new common_1.UnauthorizedException('Unauthorized!');
            }
            body.owner_id = loggedInUser.user_id;
            game.title = body.title;
            game.short_description = body.short_description;
            game.long_description = body.long_description;
            game.features = body.features;
            game.installs = body.installs;
            game.current_version = body.current_version;
            game.category = body.category;
            game.owner_id = body.owner_id;
            if (body.game_file) {
                game.game_file = body.game_file;
            }
            if (body.banner) {
                game.banner = body.banner;
            }
            if (body.whats_new) {
                game.whats_new = body.whats_new;
            }
            game.save();
            return { msg: 'Game Updated!' };
        }
        catch ({ response }) {
            throw new common_1.HttpException({ msg: response.message }, response.statusCode);
        }
    }
    async search(category, query) {
        const toFind = {};
        if (query) {
            toFind.title = { $regex: new RegExp('.*' + query.toLowerCase(), 'i') };
        }
        if (category) {
            toFind.category = { $regex: new RegExp('.*' + category, 'i') };
        }
        const games = await this.gamesModel.find(toFind);
        return games;
    }
};
GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(config_1.ModelsName.games)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map