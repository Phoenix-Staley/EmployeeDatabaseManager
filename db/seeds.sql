USE company_db;

INSERT INTO departments (dept_name)
VALUES ("Engineering"),
("Sales"),
("Finance"),
("Legal");

INSERT INTO roles (title, dept_id)
VALUES ("Engineer", 1),
("Manager", 1),
("Intern", 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Garcia", 1, 3),
("Sarah", "Brown", 1, 3),
("Jordan", "Johnson", 2, NULL),
("Robin", "Smith", 3, 2);