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

// Encontrar todas las órdenes realizadas por clientes de un país dado
export const getOrdersByCountry = async (connection, country) => {
    const [result] = await connection.query(`
    SELECT orders.*
    FROM orders
    INNER JOIN customers ON orders.customerNumber = customers.customerNumber
    WHERE customers.country = ?
    `, [country]);
    return result;
};

// Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente
export const getTotalSalesByCustomer = async (connection) => {
    const [result] = await connection.query(`
    SELECT orders.customerNumber, SUM(orderdetails.quantityOrdered * orderdetails.priceEach) AS totalSales
    FROM orders
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY orders.customerNumber
    `);
    return result;
};

// Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor
export const getAverageCreditLimitByEmployee = async (connection) => {
    const [result] = await connection.query(`
    SELECT employees.employeeNumber, AVG(customers.creditLimit) AS averageCreditLimit
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    GROUP BY employees.employeeNumber
    `);
    return result;
};