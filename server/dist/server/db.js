import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';
import dotenv from 'dotenv';
dotenv.config();
const connection = mysql.createPool({
    uri: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/maha_plate',
});
export const db = drizzle(connection, { schema, mode: 'default' });
