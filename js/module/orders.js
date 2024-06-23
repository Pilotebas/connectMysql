import { connection } from "../../db/connection.js";

// Listar todas las órdenes que tienen un estado de 'Enviado'
export const getShippedOrders = async () => {
    const [result] = await connection.query('SELECT * FROM orders WHERE status = "Shipped"');
    return result;
};

// Calcular el total de órdenes realizadas por cada cliente
export const getOrderCountByCustomer = async (connection) => {
    const [result] = await connection.query(`
    SELECT customerNumber, COUNT(*) AS orderCount
    FROM orders
    GROUP BY customerNumber
    `);
    return result;
};

// Calcular el total de órdenes gestionadas por cada empleado
export const getTotalOrdersByEmployee = async (connection) => {
    const [result] = await connection.query(`
    SELECT employees.employeeNumber, COUNT(DISTINCT orders.orderNumber) AS totalOrders
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    GROUP BY employees.employeeNumber
    `);
    return result;
};

// Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente dado
export const getOrderDetailsByCustomerNumber = async (connection, customerNumber) => {
    const [result] = await connection.query(`
    SELECT orderdetails.*, products.productName
    FROM orderdetails
    INNER JOIN orders ON orderdetails.orderNumber = orders.orderNumber
    INNER JOIN products ON orderdetails.productCode = products.productCode
    WHERE orders.customerNumber = 101
    `);
    return result;
};