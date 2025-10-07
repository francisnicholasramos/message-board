import {Pool} from "pg";
import "dotenv/config";

const pool = new Pool({
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: 5432, 
        ssl: {
            rejectUnauthorized: false
        },
});

export const query = (text: string, params?: unknown[]) => 
    pool.query(text, params);
