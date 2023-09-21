"use strict";

import mysql from 'mysql2';
import 'dotenv/config';
import fs from 'fs/promises'

const database = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true
});

// Add SSL certificate if provided in environment variables
if (process.env.MYSQL_CERT) {
    // Read the SSL certificate file asynchronously
    dbConfig.ssl = { ca: await fs.readFile("DigiCertGlobalRootCA.crt.pem") }; // Specify SSL certificate
}

export default database;