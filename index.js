const mysql = require("mysql2");
const inquirer = require("inquirer");
const sql = require("./utils");
let connection;

const handle_err = err => {
    console.error("There's been an error:", err);
}

// Defines the connection to the sql database using the user made in schema.sql
connection = mysql.createConnection({
    host: "localhost",
    user: "employee",
    password: "",
    database: "company_db"
});
connection.connect();

// The list of actions the user can choose to do
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

// Prints the program title
console.log(String.raw`
  _____                                          _____  ____    __  __                                   
 / ____|                                        |  __ \|  _ \  |  \/  |                                  
| |     ___  _ __ ___  _ __   __ _ _ __  _   _  | |  | | |_) | | \  / | __ _ _ __   __ _  __ _  ___ _ __ 
| |    / _ \| '_ \ _ \| '_ \ / _\ | '_ \| | | | | |  | |  _ <  | |\/| |/ _\ | '_ \ / _\ |/ _\ |/ _ \ '__|
| |___| (_) | | | | | | |_) | (_| | | | | |_| | | |__| | |_) | | |  | | (_| | | | | (_| | (_| |  __/ |   
 \_____\___/|_| |_| |_| .__/ \__,_|_| |_|\__, | |_____/|____/  |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|   
                     | |                 __/ |                                           __/ |          
                     |_|                |___/                                           |___/           
`);

// The main function that displays the options and responds accordingly for each choice
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

        } else if (choice === "Delete Department") {
            sql.deletes.delete_department(connection)
            .then(res => main())
            .catch(err => handle_err(err));

        } else if (choice === "Quit") {
            console.log("Goodbye");
            connection.end();
        }
    });
}

// Starts the main function
main();