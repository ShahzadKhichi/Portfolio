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
exports.SkillService = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
let SkillService = class SkillService {
    constructor(skillRepository) {
        this.skillRepository = skillRepository;
    }
    async getAllSkills() {
        return await this.skillRepository.getAllSkills();
    }
    async createSkill(data) {
        return await this.skillRepository.createSkill(data);
    }
    async updateSkill(id, data) {
        return await this.skillRepository.updateSkill(id, data);
    }
    async deleteSkill(id) {
        return await this.skillRepository.deleteSkill(id);
    }
};
exports.SkillService = SkillService;
exports.SkillService = SkillService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.ISkillRepository)),
    __metadata("design:paramtypes", [Object])
], SkillService);
