import { connection } from "../../db/connection.js";

// Encontrar todos los empleados que trabajan en la oficina de 'San Francisco'
export const getAllEmployeeswithCodeinSanFrancisco= async()=>{
    let [result] = await connection.query(`SELECT firstName, lastName FROM employees WHERE officeCode = 1`);
    return result;
}

// Obtener la cantidad total de empleados
export const getTotalEmployees = async (connection) => {
    const [result] = await connection.query('SELECT COUNT(*) AS totalEmployees FROM employees');
    return result;
};

// Contar la cantidad de empleados por título de trabajo
export const getEmployeeCountByJobTitle = async (connection) => {
    const [result] = await connection.query('SELECT jobTitle, COUNT(*) AS employeeCount FROM employees GROUP BY jobTitle');
    return result;
};

// Obtener los nombres y direcciones de correo electrónico de los empleados que reportan a un empleado dado
export const getEmployeesReportingTo = async (connection, reportsTo) => {
    const [result] = await connection.query('SELECT firstName, email FROM employees WHERE reportsTo = ?', [reportsTo]);
    return result;
};

// Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado
export const getAverageSalesByEmployee = async (connection) => {
    const [result] = await connection.query(`
    SELECT employees.employeeNumber, AVG(orderdetails.quantityOrdered * orderdetails.priceEach) AS averageSales
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY employees.employeeNumber
    `);
    return result;
};

// Calcular el total de pagos recibidos por cada vendedor
export const getTotalPaymentsByEmployee = async (connection) => {
    const [result] = await connection.query(`
    SELECT employees.employeeNumber, SUM(payments.amount) AS totalPayments
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN payments ON customers.customerNumber = payments.customerNumber
    GROUP BY employees.employeeNumber
    `);
    return result;
};