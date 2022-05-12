const inquirer = require("inquirer");

const wait_to_resolve = (resolve) => {
    inquirer.prompt([{
        type: "list",
        choices: ["Ok"],
        message: "Press 'Ok' to continue",
        name: "continue"
    }])
    .then(res => resolve());
}

const view_all_emps = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT employees.id AS ID, employees.first_name AS First, employees.last_name AS Last,
        employees.manager_id AS Manager, roles.title AS Role, roles.salary AS Salary, departments.dept_name AS Department
        FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.dept_id = departments.id`, (err, res) => {
            if (err) {
                reject(err);
            }
            console.log();
            console.table(res, ["ID", "First", "Last", "Role", "Salary", "Department", "Manager"]);
            wait_to_resolve(resolve);
        });
    });
}

const view_all_roles = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary,
        departments.dept_name AS Department
        FROM roles
        INNER JOIN departments ON roles.dept_id = departments.id`, (err, res) => {
            if (err) {
                reject(err);
            }
            console.log();
            console.table(res, ["ID", "Title", "Salary", "Department"]);
            wait_to_resolve(resolve);
        });
    })
}

const view_all_departments = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, dept_name AS Department FROM departments`, (err, res) => {
            if (err) {
                reject(err);
            }
            console.log();
            console.table(res, ["ID", "Department"]);
            wait_to_resolve(resolve);
        });
    })
}

module.exports = { view_all_emps, view_all_roles, view_all_departments, wait_to_resolve };