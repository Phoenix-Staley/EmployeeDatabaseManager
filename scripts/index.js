const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "password1",
    database: 'test'
});
const mainOptions = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role",
        "View All Roles", "Add Role", "View All Departments", "Add Department"],
        name: "todo"
    }
];
const viewAllEmps = (connection) => {
    connection.query('SELECT * FROM example', (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Name")
        }
    })
}

connection.connect();
// connection.execute(`IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = "company")
//     BEGIN
//         CREATE DATABASE company
//         USE company
//     END`);

inquirer.prompt(mainOptions)
.then((choice) => {
    connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "company"', (err, results) => {
        // console.log(results);
        if (!results[0]) {
            connection.execute('CREATE DATABASE company');
            connection.execute('USE company');
            (() => {
                connection.execute(`CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT,
                    firstName VARCHAR(31) NOT NULL,
                    lastName VARCHAR(31) NOT NULL,
                    roleId INT NOT NULL,
                    managerId INT,
                    PRIMARY KEY (id),
                    FOREIGN KEY (roleId) REFERENCES roles(id))`);
            })
            console.log("New 'company' database made!");
        } else {
            console.log("Results != [] :", results);
        }
        connection.end();
    });
});