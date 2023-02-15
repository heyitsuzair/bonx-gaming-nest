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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("../../config");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersModel, jwtService) {
        this.usersModel = usersModel;
        this.jwtService = jwtService;
    }
    async signup(body) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(body.password, salt);
            body.password = hash;
            await this.usersModel.create(body);
            return { msg: 'Registration Successful!' };
        }
        catch ({ code, message }) {
            let errorMessage = message;
            errorMessage = code === 11000 && 'Email Already Exists!';
            throw new common_1.HttpException({ msg: errorMessage }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        try {
            const { email, password } = body;
            const user = await this.usersModel.findOne({ email });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid Email Or Password');
            }
            const is_password_correct = await bcrypt.compare(password, user.password);
            if (!is_password_correct) {
                throw new common_1.UnauthorizedException('Invalid Email Or Password');
            }
            const token = this.generateJwt(user);
            const user_details = {
                name: user.name,
                email: user.email,
                _id: user._id,
            };
            return { token, user_details };
        }
        catch ({ code, message }) {
            throw new common_1.HttpException({ msg: message }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async update(body, token) {
        const { name, email, password } = body;
        try {
            const loggedInUser = this.jwtService.decode(token.split(' ')[1]);
            const user = await this.usersModel.findById(loggedInUser.user_id);
            if (user.email !== email) {
                const is_email_in_use = await this.usersModel.findOne({
                    email,
                });
                if (is_email_in_use) {
                    throw new common_1.BadRequestException('Email Already Exists!');
                }
                user.email = email;
            }
            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                user.password = hash;
            }
            user.name = name;
            user.save();
            return { msg: 'Profile Updated!' };
        }
        catch ({ response }) {
            throw new common_1.HttpException({ msg: response.message }, response.statusCode);
        }
    }
    generateJwt(user) {
        const payload = { user_id: user._id };
        return this.jwtService.sign(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(config_1.ModelsName.users)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map