const mysql = require("mysql2");
const inquirer = require("inquirer");
const sql = require("./utils");
// const schema = require("../db/schema.sql");
// console.log(schema);
let connection;

const handle_err = err => {
    console.error("There's been an error:", err);
}

connection = mysql.createConnection({
    host: "localhost",
    user: "employee",
    password: "",
    database: "company_db"
});

// connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "company_db"', (err, results) => {
//     if (!results[0]) {
//         throw "It seems you do not have a database set up. Please run schema.sql and seeds.sql";
//     } else {
//         connection.query("USE company_db");
//     }
// });
const main_options = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles",
        "Add Employee", "Update Employee Role", "Add Role", "Add Department",
        "Delete Role", "Delete Employee", "Delete Department", "Quit"],
        name: "todo"
    }
];

connection.connect();
// connection.execute(`IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = "company")
//     BEGIN
//         CREATE DATABASE company
//         USE company
//     END`);

console.log(String.raw`
 ______                 _                          _____  ____     __  __                                   
|  ____|               | |                        |  __ \|  _ \   |  \/  |                                  
| |__   _ __ ___  _ __ | | ___  _   _  ___  ___   | |  | | |_) |  | \  / | __ _ _ __   __ _  __ _  ___ _ __ 
|  __| | '_ \ _ \| '_ \| |/ _ \| | | |/ _ \/ _ \  | |  | |  _ <   | |\/| |/ _\ | '_ \ / _\ |/ _\ |/ _ | '__|
| |____| | | | | | |_) | | (_) | |_| |  __|  __/  | |__| | |_) |  | |  | | (_| | | | | (_| | (_| |  __| |   
|______|_| |_| |_| .__/|_|\___/ \__, |\___|\___|  |_____/|____/   |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|   
                 | |             __/ |                                                       __/ |          
                 |_|            |___/                                                       |___/           
`);

function main() {
    inquirer.prompt(main_options)
    .then((res) => {
        choice = res.todo
        if (choice === "View All Employees") {
            sql.queries.view_all_emps(connection)
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "View All Roles") {
            sql.queries.view_all_roles(connection)
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "View All Departments") {
            sql.queries.view_all_departments(connection)
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "Add Employee") {
            sql.inserts.add_employee(connection).catch(err => console.error(err))
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "Update Employee Role") {
            sql.updates.update_role(connection)
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "Add Role") {
            sql.inserts.add_role(connection)
            .then(res => main())
            .catch(err => console.error("Error: make sure the role's name is unique."));

        } else if (choice === "Add Department") {
            sql.inserts.add_department(connection)
            .then(res => main())
            .catch(err => console.error("Error: make sure the department's name is unique."));

        } else if (choice === "Delete Employee") {
            sql.deletes.delete_employee(connection)
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "Delete Role") {
            sql.deletes.delete_role(connection)
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "Quit") {
            console.log("Goodbye");
            connection.end();
        }
    });
}

main();