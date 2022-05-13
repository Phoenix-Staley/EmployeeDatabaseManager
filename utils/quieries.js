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

const get_roles_emps = (reject, connection, cb) => {
    let roles;
    let emps;
    connection.query(`SELECT title AS role, dept_id FROM roles`, (err, saved_roles) => {
        if (err) {
            reject(err);
        }
        roles = saved_roles.map(obj => obj.role);
        connection.query(`SELECT first_name AS first, last_name AS last FROM employees`, (err, saved_emps) => {
            if (err) {
                reject(err);
            }
            emps = saved_emps.map(obj => obj.first + " " + obj.last)
            cb(roles, emps);
        });
    });
}

const view_all_emps = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT employees.id AS ID, employees.first_name AS First, employees.last_name AS Last,
        employees.manager_id AS Manager_ID, roles.title AS Role, roles.salary AS Salary, departments.dept_name AS Department
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.dept_id = departments.id`, (err, res) => {
            if (err) {
                reject(err);
            }
            console.log();
            console.table(res, ["ID", "First", "Last", "Role", "Salary", "Department", "Manager_ID"]);
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
        connection.query(`SELECT id AS ID, dept_name AS Department FROM departments`, (err, res) => {
            if (err) {
                reject(err);
            }
            console.log();
            console.table(res, ["ID", "Department"]);
            wait_to_resolve(resolve);
        });
    })
}

module.exports = { view_all_emps, view_all_roles, view_all_departments, get_roles_emps, wait_to_resolve };