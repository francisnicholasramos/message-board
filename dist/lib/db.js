"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
exports.db = {
    database: PGDATABASE,
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
};
