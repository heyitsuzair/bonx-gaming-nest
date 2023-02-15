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
exports.UpdateDTO = exports.LoginDto = exports.SignupDTO = void 0;
const class_validator_1 = require("class-validator");
class SignupDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name Is Required' }),
    __metadata("design:type", String)
], SignupDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email Is Required' }),
    (0, class_validator_1.IsEmail)(undefined, { message: 'Email Is Invalid' }),
    __metadata("design:type", String)
], SignupDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Please Enter Password' }),
    __metadata("design:type", String)
], SignupDTO.prototype, "password", void 0);
exports.SignupDTO = SignupDTO;
class LoginDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email Is Required' }),
    (0, class_validator_1.IsEmail)(undefined, { message: 'Email Is Invalid' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Please Enter Password' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;
class UpdateDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name Is Required' }),
    __metadata("design:type", String)
], UpdateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email Is Required' }),
    (0, class_validator_1.IsEmail)(undefined, { message: 'Email Is Invalid' }),
    __metadata("design:type", String)
], UpdateDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.password !== undefined),
    __metadata("design:type", String)
], UpdateDTO.prototype, "password", void 0);
exports.UpdateDTO = UpdateDTO;
//# sourceMappingURL=index.js.map