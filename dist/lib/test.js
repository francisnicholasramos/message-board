"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db_1 = require("./db");
(async () => {
    const client = new pg_1.Client(db_1.db);
    try {
        console.log("Database config:", {
            host: db_1.db.host,
            database: db_1.db.database,
        });
        console.log("Connecting to database...");
        await client.connect();
        console.log("Connected successfully.");
        const tableExists = await client.query(`
               SELECT EXISTS (
                   SELECT FROM information_schema.tables
                   WHERE table_schema = 'public'
                   AND table_name = 'messages'
               );
           `);
        if (!tableExists.rows[0].exists) {
            await client.query(`
                CREATE TABLE messages (
                   id SERIAL PRIMARY KEY,
                   author_name VARCHAR(50) NOT NULL,
                   message TEXT,
                   created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log("Creating table...");
            console.log("Table created successfully.");
        }
        else {
            return;
        }
    }
    catch (error) {
        const err = error;
        console.error("Database initialization error details:", {
            message: err.message,
            code: err.code,
            detail: err.detail,
        });
        throw error;
    }
    finally {
        await client.end();
    }
})();
