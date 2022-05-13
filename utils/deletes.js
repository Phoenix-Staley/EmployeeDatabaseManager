// This file has all the functions to delete employees, roles, and departments

const { get_depts, get_roles_emps, wait_to_resolve } = require("./quieries");
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
                    [emp_name[0], emp_name[1]],
                    (err, results) => {if (err) {reject(err)}});
                console.log(`${res.emp_name} deleted from database.`);
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

const delete_department = (connection) => {
    return new Promise((resolve, reject) => {
        get_depts(reject, connection, (depts) => {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which department would you like to delete?",
                    choices: departments,
                    name: "dept"
                }
            ])
            .then(res => {
                connection.query(`DELETE FROM departments
                    WHERE dept_name = ?`,
                    res.dept,
                    (err, results) => {if (err) {reject(err)}});
                console.log(`${res.dept} deleted from database.`);
                wait_to_resolve(resolve);
            });
        });
    });
}

module.exports = { delete_employee, delete_role, delete_department };