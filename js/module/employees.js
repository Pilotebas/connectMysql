import { connection } from "../../db/connection.js";

// Encontrar todos los empleados que trabajan en la oficina de 'San Francisco'
export const getAllEmployeeswithCodeinSanFrancisco= async()=>{
    let [result] = await connection.query(`SELECT firstName, lastName FROM employees WHERE officeCode = 1`);
    return result;
}