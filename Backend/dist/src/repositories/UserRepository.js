"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tsyringe_1 = require("tsyringe");
const Admin_Model_1 = __importDefault(require("../Models/Admin.Model"));
let UserRepository = class UserRepository {
    async findByEmail(email) {
        return await Admin_Model_1.default.findOne({ email });
    }
    async createAdmin(adminData) {
        return await Admin_Model_1.default.create(adminData);
    }
    async updateAdmin(email, updateData) {
        return await Admin_Model_1.default.findOneAndUpdate({ email }, updateData, { new: true });
    }
    async findById(id) {
        return await Admin_Model_1.default.findById(id);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, tsyringe_1.injectable)()
], UserRepository);
