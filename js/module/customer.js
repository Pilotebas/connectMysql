import { connection } from "../../db/connection.js";

//Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:
export const getCustomersByCreditLimit = async (creditLimit) => {
    const [result] = await connection.query('SELECT * FROM customers WHERE creditLimit >= 50000');
    return result;
};

// Obtener el promedio del límite de crédito de todos los clientes
export const getAverageCreditLimit = async (connection) => {
    const [result] = await connection.query('SELECT AVG(creditLimit) AS averageCreditLimit FROM customers');
    return result;
};