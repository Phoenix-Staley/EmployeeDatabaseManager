const mysql = require("mysql2");
const inquirer = require("inquirer");
const sql = require("../utils");
// const schema = require("../db/schema.sql");
// console.log(schema);
let connection;


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
        choices: ["View All Employees", "Add Employee", "Update Employee Role",
        "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
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
    .then((choice) => {
        if (choice.todo === "View All Employees") {
            sql.queries.view_all_emps(connection)
            .then(res => main());
        } else if (choice.todo === "Add Employee") {
            sql.inserts.add_employee(connection).catch(err => console.error(err))
            .then(res => main());
        } else if (choice.todo === "View All Roles") {
            sql.queries.view_all_roles(connection)
            .then(res => main());
        } else if (choice.todo === "Update Employee Role") {
            sql.updates.update_role(connection)
            .then(res => main());
        } else if (choice.todo === "Quit") {
            console.log("Goodbye");
            connection.end();
        }
    });
}

main();