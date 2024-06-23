import { connection } from "../../db/connection.js";

//Recuperar todas las líneas de productos con sus descripciones
export const getEmployeesByOffice = async (officeCode) => {
    const [result] = await connection.query('SELECT productLine,productDescription FROM products;');
    return result;
};

// Calcular el total de productos en stock
export const getTotalStock = async (connection) => {
    const [result] = await connection.query('SELECT SUM(quantityInStock) AS totalStock FROM products');
    return result;
};

// Encontrar el precio medio de compra de todos los productos
export const getAverageBuyPrice = async (connection) => {
    const [result] = await connection.query('SELECT AVG(buyPrice) AS averageBuyPrice FROM products');
    return result;
};

// Calcular la cantidad media de productos pedidos en las órdenes
export const getAverageQuantityOrdered = async (connection) => {
    const [result] = await connection.query('SELECT AVG(quantityOrdered) AS averageQuantityOrdered FROM orderdetails');
    return result;
};

// Encontrar el precio total de todos los productos
export const getTotalProductValue = async (connection) => {
    const [result] = await connection.query('SELECT SUM(products.buyPrice) AS totalPriceProducts FROM products');
    return result;
};

// Calcular el promedio del precio sugerido (MSRP) de los productos
export const getAverageMSRP = async (connection) => {
    const [result] = await connection.query('SELECT AVG(MSRP) AS averageMSRP FROM products');
    return result;
};

// Listar todos los productos junto con las descripciones de sus líneas de productos
export const getProductsWithLineDescriptions = async (connection) => {
    const [result] = await connection.query(`
    SELECT products.productName, productlines.textDescription
    FROM products
    INNER JOIN productlines ON products.productLine = productlines.productLine
    `);
    return result;
};

// Encontrar la cantidad total de productos pedidos por cada cliente
export const getTotalQuantityOrderedByCustomer = async (connection) => {
    const [result] = await connection.query(`
    SELECT orders.customerNumber, SUM(orderdetails.quantityOrdered) AS totalQuantityOrdered
    FROM orders
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY orders.customerNumber
    `);
    return result;
};

// Obtener el promedio de la cantidad de productos en stock por línea de productos
export const getAverageStockByProductLine = async (connection) => {
    const [result] = await connection.query(`
    SELECT productLine, AVG(quantityInStock) AS averageStock
    FROM products
    GROUP BY productLine
    `);
    return result;
};

// Obtener la cantidad total de productos vendidos por cada línea de productos
export const getTotalProductsSoldByProductLine = async (connection) => {
    const [result] = await connection.query(`
    SELECT products.productLine, SUM(orderdetails.quantityOrdered) AS totalProductsSold
    FROM products
    INNER JOIN orderdetails ON products.productCode = orderdetails.productCode
    GROUP BY products.productLine
    `);
    return result;
};

// Encontrar el promedio de la cantidad de productos ordenados por cada cliente
export const getAverageQuantityOrderedByCustomer = async (connection) => {
    const [result] = await connection.query(`
    SELECT orders.customerNumber, AVG(orderdetails.quantityOrdered) AS averageQuantityOrdered
    FROM orders
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY orders.customerNumber
    `);
    return result;
};

// Obtener el promedio del precio de compra de los productos por línea de productos
export const getAverageBuyPriceByProductLine = async (connection) => {
const [result] = await connection.query(`
    SELECT productLine, AVG(buyPrice) AS averageBuyPrice
    FROM products
    GROUP BY productLine
    `);
    return result;
};

// Encontrar la cantidad total de productos vendidos por cada vendedor
export const getTotalProductsSoldByEmployee = async (connection) => {
    const [result] = await connection.query(`
    SELECT employees.employeeNumber, SUM(orderdetails.quantityOrdered) AS totalProductsSold
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY employees.employeeNumber
    `);
    return result;
};