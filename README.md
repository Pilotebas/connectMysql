### Consultas de una sola tabla

1. **Recuperar todas las líneas de productos con sus descripciones:**

    ```sql
    SELECT productLine,productDescription FROM products;
    ```

2. **Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

    ```sql
    SELECT firstName, lastName FROM employees WHERE officeCode = 1;
    ```

3. **Listar todas las órdenes que tienen un estado de 'Enviado':**

    ```sql
    SELECT * FROM orders WHERE status ='Shipped';
    ```

4. **Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**

    ```sql
    SELECT * FROM payments WHERE customerNumber = 103;
    ```

5. **Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**

    ```sql
    SELECT * FROM customers WHERE creditLimit >= 50000;
    ```

### Consultas de múltiples tablas

1. **Listar todos los productos junto con las descripciones de sus líneas de productos:**

    ```sql
    SELECT products.productName, productlines.textDescription FROM products inner join productlines on products.productLine = productlines.productLine;
    ```

2. **Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**

    ```sql
    SELECT firstName, email FROM employees WHERE reportsTo = 1143;
    ```

3. **Encontrar todas las órdenes realizadas por clientes de 'Francia':**

    ```sql
    SELECT orders.* FROM orders inner join customers on orders.customerNumber = customers.customerNumber WHERE customers.country = 'France';
    ```

4. **Listar el monto total de los pagos recibidos de cada cliente:**

    ```sql
    SELECT payments.customerNumber, SUM(payments.amount) AS totalPayments FROM payments JOIN (
       SELECT DISTINC customerNumber
       FROM orders
       WHERE status IN ('Shipped', 'Resolved')
    )  newOrders ON payments.customerNumber = newOrders.customerNumber
    GROUP BY payments.customerNumber;
    ```

5. **Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 101:**

    ```sql
    SELECT orderdetails.*, products.productName FROM orderdetails INNER JOIN orders ON orderdetails.orderNumber = orders.orderNumber INNER JOIN products ON orderdetails.productCode = products.productCode WHERE orders.customerNumber = 101;
    ```










## Parte 2/2

### Consultas de una sola tabla

1. **Obtener el promedio del límite de crédito de todos los clientes:**

    ```sql
    SELECT AVG(creditLimit) AS averageCreditLimit
    FROM customers;
    ```

2. **Calcular el total de productos en stock:**

    ```sql
    SELECT SUM(quantityInStock) AS totalStock
    FROM products;
    ```

3. **Encontrar el precio medio de compra de todos los productos:**

    ```sql
    SELECT AVG(buyPrice) AS averageBuyPrice
    FROM products;
    ```

4. **Contar la cantidad de oficinas en cada país:**

    ```sql
    SELECT country, COUNT(*) AS officeCount
    FROM offices
    GROUP BY country;
    ```

5. **Calcular el total de pagos recibidos:**

    ```sql
    SELECT SUM(amount) AS totalPayments
    FROM payments;
    ```




6. **Obtener la cantidad total de empleados:**

    ```sql
    SELECT COUNT(*) AS totalEmployees
    FROM employees;
    ```

7. **Calcular la cantidad media de productos pedidos en las órdenes:**

    ```sql
    SELECT AVG(quantityOrdered) AS averageQuantityOrdered
    FROM orderdetails;
    ```

8. **Encontrar el precio total de todos los productos:**

    ```sql
    SELECT SUM(MSRP * quantityInStock) AS totalProductValue
    FROM products;
    ```

9. **Calcular el promedio del precio sugerido (MSRP) de los productos:**

    ```sql
    SELECT AVG(MSRP) AS averageMSRP
    FROM products;
    ```

10. **Contar la cantidad de empleados por título de trabajo:**

    ```sql
    SELECT jobTitle, COUNT(*) AS employeeCount
    FROM employees
    GROUP BY jobTitle;
    ```

### Consultas de múltiples tablas

1. **Calcular el total de pagos recibidos por cada cliente:**

    ```sql
    SELECT payments.customerNumber, SUM(payments.amount) AS totalPayments
    FROM payments
    GROUP BY payments.customerNumber;
    ```

2. **Obtener el promedio del límite de crédito de los clientes por país:**

    ```sql
    SELECT customers.country, AVG(customers.creditLimit) AS averageCreditLimit
    FROM customers
    GROUP BY customers.country;
    ```

3. **Calcular el total de órdenes realizadas por cada cliente:**

    ```sql
    SELECT customerNumber, COUNT(*) AS orderCount
    FROM orders
    GROUP BY customerNumber;
   ```

4. **Encontrar la cantidad total de productos pedidos por cada cliente:**

    ```sql
    SELECT orders.customerNumber, SUM(orderdetails.quantityOrdered) AS totalQuantityOrdered
    FROM orders
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY orders.customerNumber;
    ```

5. **Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

    ```sql
    SELECT orders.customerNumber, SUM(orderdetails.quantityOrdered * orderdetails.priceEach) AS totalSales
    FROM orders
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY orders.customerNumber;
    ```

6. **Obtener el promedio de la cantidad de productos en stock por línea de productos:**

    ```sql
    SELECT productLine, AVG(quantityInStock) AS averageStock
    FROM products
    GROUP BY productLine;
    ```

7. **Calcular el total de pagos recibidos por cada país:**

    ```sql
    SELECT customers.country, SUM(payments.amount) AS totalPayments
    FROM customers
    INNER JOIN payments ON customers.customerNumber = payments.customerNumber
    GROUP BY customers.country;
    ```

8. **Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:**

    ```sql
    SELECT employees.employeeNumber, AVG(orderdetails.quantityOrdered * orderdetails.priceEach) AS averageSales
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY employees.employeeNumber;
    ```

9. **Calcular el total de órdenes gestionadas por cada empleado:**

    ```sql
    SELECT employees.employeeNumber, COUNT(DISTINCT orders.orderNumber) AS totalOrders
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    GROUP BY employees.employeeNumber;
    ```

10. **Obtener la cantidad total de productos vendidos por cada línea de productos:**

    ```sql
    SELECT products.productLine, SUM(orderdetails.quantityOrdered) AS totalProductsSold
    FROM products
    INNER JOIN orderdetails ON products.productCode = orderdetails.productCode
    GROUP BY products.productLine;
    ```

11. **Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

    ```sql
    SELECT orders.customerNumber, AVG(orderdetails.quantityOrdered) AS averageQuantityOrdered
    FROM orders
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY orders.customerNumber;
    ```

12. **Calcular el total de ventas realizadas en cada país:**

    ```sql
    SELECT customers.country, SUM(orderdetails.quantityOrdered * orderdetails.priceEach) AS totalSales
    FROM customers
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY customers.country;
    ```

13. **Obtener el promedio del precio de compra de los productos por línea de productos:**

    ```sql
    SELECT productLine, AVG(buyPrice) AS averageBuyPrice
    FROM products
    GROUP BY productLine;
    ```

14. **Encontrar la cantidad total de productos vendidos por cada vendedor:**

    ```sql
    SELECT employees.employeeNumber, SUM(orderdetails.quantityOrdered) AS totalProductsSold
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY employees.employeeNumber;
    ```

15. **Calcular el total de pagos recibidos por cada vendedor:**

    ```sql
    SELECT employees.employeeNumber, SUM(payments.amount) AS totalPayments
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN payments ON customers.customerNumber = payments.customerNumber
    GROUP BY employees.employeeNumber;
    ```

16. **Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

    ```sql
    SELECT employees.employeeNumber, AVG(customers.creditLimit) AS averageCreditLimit
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    GROUP BY employees.employeeNumber;
    ```

17. **Encontrar el total de ventas realizadas por cada oficina:**

    ```sql
    SELECT employees.officeCode, SUM(orderdetails.quantityOrdered * orderdetails.priceEach) AS totalSales
    FROM employees
    INNER JOIN customers ON employees.employeeNumber = customers.salesRepEmployeeNumber
    INNER JOIN orders ON customers.customerNumber = orders.customerNumber
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY employees.officeCode;
    ```

18. **Calcular la cantidad media de productos pedidos por cada cliente:**

    ```sql
    SELECT orders.customerNumber, AVG(orderdetails.quantityOrdered) AS averageQuantityOrdered
    FROM orders
    INNER JOIN orderdetails ON orders.orderNumber = orderdetails.orderNumber
    GROUP BY orders.customerNumber;
    ```

19. **Obtener el total de pagos realizados en cada año:**

    ```
    SELECT YEAR(paymentDate) AS year, SUM(amount) AS totalPayments
    FROM payments
    GROUP BY YEAR(paymentDate);
    ```

20. **Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

```sql
    SELECT products.productLine, AVG(orderdetails.priceEach) AS averagePriceEach
    FROM products
    INNER JOIN orderdetails ON products.productCode = orderdetails.productCode
    GROUP BY products.productLine;
```

