const { get_roles_emps, wait_to_resolve } = require("./quieries");
const inquirer = require("inquirer");

const delete_employee = (connection) => {
    return new Promise((resolve, reject) => {
        get_roles_emps(reject, connection, (roles, emps) => {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee would you like to delete?",
                    choices: emps,
                    name: "emp_name"
                }
            ])
            .then(res => {
                emp_name = res.emp_name.split(" ");
                    connection.query(`DELETE FROM employees
                    WHERE first_name = ?
                    AND last_name = ?`,
                    [emp_name[0], emp_name[0]],
                    (err, results) => {if (err) {reject(err)}});
                console.log(`${res.first_name} ${res.last_name} deleted from database.`);
                wait_to_resolve(resolve);
            });
        });
    });
}

const delete_role = (connection) => {
    return new Promise((resolve, reject) => {
        get_roles_emps(reject, connection, (roles, emps) => {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which role would you like to delete?",
                    choices: roles,
                    name: "role"
                }
            ])
            .then(res => {
                connection.query(`DELETE FROM roles
                    WHERE title = ?`,
                    res.role,
                    (err, results) => {if (err) {reject(err)}});
                console.log(`${res.role} deleted from database.`);
                wait_to_resolve(resolve);
            });
        });
    });
}

module.exports = { delete_employee, delete_role };