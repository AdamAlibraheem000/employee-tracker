DROP TABLE IF EXISTS department;  
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary: DECIMAL(10, 2) NOT NULL,
    department_id: INTEGER NOT NULL
)

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    CONSTRAINT role_id FOREIGN KEY () REFERENCES role(id) ON DELETE CASCADE--to hold reference to employee role
    CONSTRAINT manager_id FOREIGN KEY
    --INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

        

        

        

        