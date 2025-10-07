import "dotenv/config";

const { PGHOST, 
        PGDATABASE, 
        PGUSER, 
        PGPASSWORD
} = process.env

export const db = {
        database: PGDATABASE,
        host: PGHOST,
        user: PGUSER,
        password: PGPASSWORD,
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        },
}
