import { connection } from "../../db/connection.js";

// Contar la cantidad de oficinas en cada país
export const getOfficeCountByCountry = async (connection) => {
    const [result] = await connection.query('SELECT country, COUNT(*) AS officeCount FROM offices GROUP BY country');
    return result;
};

// Encontrar el total de ventas realizadas por cada oficina
export const getTotalSalesByOffice = async (connection) => {
    const [result] = await connection.query(`
    SELECT employees.officeCode, SUM(orderdetails.quantityOrdered * orderdetails.priceEach) AS totalSales
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY employees.officeCode
    `);
    return result;
};