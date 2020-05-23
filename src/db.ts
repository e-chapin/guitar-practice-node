import dotenv from 'dotenv';

dotenv.config();

const Pool = require('pg').Pool;

export const pool = new Pool({
  connectionString: process.env.DB_CONSTRING
});
