"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const messageController_1 = require("../controller/messageController");
const validator_1 = require("../lib/validator");
exports.router = (0, express_1.Router)();
exports.router.get("/", messageController_1.getMessages);
exports.router.post("/new", validator_1.inputSchema, messageController_1.postMessage);
