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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGameDto = exports.CreateGameDto = void 0;
const class_validator_1 = require("class-validator");
class CreateGameDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Title Is Required' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Short Description Is Required' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "short_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Long Description Is Required' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "long_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Features Are Required' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "features", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.whats_new !== undefined),
    __metadata("design:type", String)
], CreateGameDto.prototype, "whats_new", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Total Installs Is Required' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "installs", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Current Version Is Required' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "current_version", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Category Is Required' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Please Provide Game File' }),
    (0, class_validator_1.IsString)({ message: 'Game File Must Be A base64 String' }),
    __metadata("design:type", String)
], CreateGameDto.prototype, "banner", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Please Provide Banner' }),
    (0, class_validator_1.IsString)({ message: 'Banner Must Be A base64 String' }),
    __metadata("design:type", Object)
], CreateGameDto.prototype, "game_file", void 0);
exports.CreateGameDto = CreateGameDto;
class UpdateGameDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Title Is Required' }),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Short Description Is Required' }),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "short_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Long Description Is Required' }),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "long_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Features Are Required' }),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "features", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.whats_new !== undefined),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "whats_new", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Total Installs Is Required' }),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "installs", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Current Version Is Required' }),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "current_version", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Category Is Required' }),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.banner !== undefined),
    __metadata("design:type", String)
], UpdateGameDto.prototype, "banner", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.game_file !== undefined),
    __metadata("design:type", Object)
], UpdateGameDto.prototype, "game_file", void 0);
exports.UpdateGameDto = UpdateGameDto;
//# sourceMappingURL=index.js.map