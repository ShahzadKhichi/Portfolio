"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../container");
const types_1 = require("../interfaces/types");
const router = (0, express_1.Router)();
const publicController = container_1.container.resolve(types_1.TYPES.PublicController);
router.post("/sendMail", publicController.sendMail);
exports.default = router;
