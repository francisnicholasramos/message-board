import {Client} from "pg";
import {db} from "./db"

(async () => {
    const client = new Client(db);

    try {
        console.log("Database config:", {
            host: db.host,
            database: db.database,
        });

        console.log("Connecting to database...");
        await client.connect();
        console.log("Connected successfully.")

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
            `)
            console.log("Creating table...")
            console.log("Table created successfully.")
        } else {
            return;
        }

    } catch (error: unknown) {
        const err = error as { message?: string; code?: string; detail?: string };
        console.error("Database initialization error details:", {
            message: err.message,
            code: err.code,
            detail: err.detail,
        });
        throw error;
    } finally {
        await client.end();
    }
})();
