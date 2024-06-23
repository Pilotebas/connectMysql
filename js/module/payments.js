import { connection } from "../../db/connection.js";

// *Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:
export const getPaymentsByCustomer = async (customerNumber) => {
    const [result] = await connection.query('SELECT * FROM payments WHERE customerNumber = 103');
    return result;
};

// Calcular el total de pagos recibidos
export const getTotalPayments = async (connection) => {
    const [result] = await connection.query('SELECT SUM(amount) AS totalPayments FROM payments');
    return result;
};