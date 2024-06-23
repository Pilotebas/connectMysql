import { connection } from "../../db/connection.js";

//Recuperar todas las líneas de productos con sus descripciones
export const getEmployeesByOffice = async (officeCode) => {
    const [result] = await connection.query('SELECT productLine,productDescription FROM products;');
    return result;
};