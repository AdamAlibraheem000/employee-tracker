DROP TABLE IF EXISTS department;  
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    d_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTEGER,
    CONSTRAINT dp_fk FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL

);

CREATE TABLE employees(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    CONSTRAINT manager_id FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);
   

        

        

        

        