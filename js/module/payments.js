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

// Listar el monto total de los pagos recibidos de cada cliente
export const getTotalPaymentsByCustomer = async (connection) => {
    const [result] = await connection.query(`
    SELECT payments.customerNumber, SUM(payments.amount) AS totalPayments
    FROM payments
    GROUP BY payments.customerNumber
    `);
    return result;
};

// Obtener el promedio del límite de crédito de los clientes por país
export const getAverageCreditLimitByCountry = async (connection) => {
    const [result] = await connection.query(`
    SELECT customers.country, AVG(customers.creditLimit) AS averageCreditLimit
    FROM customers
    GROUP BY customers.country
    `);
    return result;
};

// Calcular el total de pagos recibidos por cada país
export const getTotalPaymentsByCountry = async (connection) => {
    const [result] = await connection.query(`
    SELECT customers.country, SUM(payments.amount) AS totalPayments
    FROM customers
    INNER JOIN payments ON customers.customerNumber = payments.customerNumber
    GROUP BY customers.country
    `);
    return result;
};

// Obtener el total de pagos realizados en cada año
export const getTotalPaymentsByYear = async (connection) => {
    const [result] = await connection.query(`
    SELECT YEAR(paymentDate) AS year, SUM(amount) AS totalPayments
    FROM payments
    GROUP BY YEAR(paymentDate)
    `);
    return result;
};

// Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos
export const getAveragePriceEachByProductLine = async (connection) => {
    const [result] = await connection.query(`
    SELECT products.productLine, AVG(orderdetails.priceEach) AS averagePriceEach
    FROM products
    INNER JOIN orderdetails ON products.productCode = orderdetails.productCode
    GROUP BY products.productLine
    `);
    return result;
};