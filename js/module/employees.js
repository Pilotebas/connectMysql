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