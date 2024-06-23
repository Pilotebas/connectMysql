import { connection } from "../../db/connection.js";

// Contar la cantidad de oficinas en cada país
export const getOfficeCountByCountry = async (connection) => {
    const [result] = await connection.query('SELECT country, COUNT(*) AS officeCount FROM offices GROUP BY country');
    return result;
};