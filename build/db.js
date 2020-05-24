"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var Pool = require('pg').Pool;
exports.pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
