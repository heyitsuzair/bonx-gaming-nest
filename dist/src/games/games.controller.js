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
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const guards_1 = require("../auth/guards");
const dto_1 = require("./dto");
const games_service_1 = require("./games.service");
const utils_1 = require("../../utils");
let GamesController = class GamesController {
    constructor(gamesService) {
        this.gamesService = gamesService;
    }
    async create(body, req) {
        const uploadedBanner = await (0, utils_1.uploadPicture)(body.banner, '/gaming-mnrn/banners/');
        const uploadedFile = await (0, utils_1.uploadFile)(body.game_file, '/gaming-mnrn/game_files/');
        body.banner = uploadedBanner.url;
        body.game_file = {
            filename: uploadedFile.url,
            size: uploadedFile.bytes,
        };
        return this.gamesService.create(body, req.headers.authorization);
    }
    readGames() {
        return this.gamesService.readGames();
    }
    readOwnerGames(req) {
        return this.gamesService.readOwnerGames(req.headers.authorization);
    }
    search(category, query) {
        return this.gamesService.search(category, query);
    }
    readGame(id) {
        return this.gamesService.readGame(id);
    }
    delete(id, req) {
        return this.gamesService.delete(id, req.headers.authorization);
    }
    async update(body, id, req) {
        if (body.banner) {
            const uploadedBanner = await (0, utils_1.uploadPicture)(body.banner, '/gaming-mnrn/banners/');
            body.banner = uploadedBanner.url;
        }
        if (body.game_file) {
            const uploadedFile = await (0, utils_1.uploadFile)(body.game_file, '/gaming-mnrn/game_files/');
            body.game_file = {
                filename: uploadedFile.url,
                size: uploadedFile.bytes,
            };
        }
        return this.gamesService.update(body, req.headers.authorization, id);
    }
};
__decorate([
    (0, common_2.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateGameDto, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "readGames", null);
__decorate([
    (0, common_1.Get)('/owner'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "readOwnerGames", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "readGame", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateGameDto, String, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "update", null);
GamesController = __decorate([
    (0, common_1.Controller)('/api/games'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
exports.GamesController = GamesController;
//# sourceMappingURL=games.controller.js.map