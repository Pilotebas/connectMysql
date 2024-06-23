import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    port: '13866',
    user: 'root',
    password: 'fTIFHEEmgAyIxToWCFRUbHlDmZquPvDY',
    database: 'railway',
});