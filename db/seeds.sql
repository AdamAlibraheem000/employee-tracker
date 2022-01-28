INSERT INTO department(d_name) 
VALUES ("accounting"),
("marketing"),
("Finance"),
("beer drinkin");

INSERT INTO roles(title, salary, department_id) 
VALUES ("Lead Beefcakes",45000, 1),
("bobbyJoe", 65000, 2),
("Goat chz",45000, 3),
("Happy for you",75000, 4);

INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Adam", "Smith", 1),
("Susan", "Jones", 2),
("Lyz", "Helton", 3),
("Michael", "Bedwell", 4);

UPDATE employees SET manager_id = 1 WHERE id IN (2,3,4);