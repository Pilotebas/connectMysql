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