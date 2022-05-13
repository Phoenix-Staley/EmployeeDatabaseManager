USE company_db;

INSERT INTO departments (dept_name)
VALUES ("Engineering"),
("Sales"),
("Finance");

INSERT INTO roles (title, salary, dept_id)
VALUES ("Engineer", 80000, 1),
("Manager", 100000, 1),
("Intern", 60000, 1),
("Salesperson", 75000, 2),
("Accountant", 80000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Johnson", 2, NULL),
("Alex", "Garcia", 1, 1),
("Sarah", "Brown", 1, 1),
("Robin", "Smith", 3, 3);