import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
var Pool = pkg.Pool;
var db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
export default db;
