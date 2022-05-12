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
        connection.query(`SELECT employees.id AS id, employees.first_name AS first, employees.last_name AS last, employees.manager_id AS manager,
        roles.title AS role, roles.salary AS salary, departments.dept_name AS department
        FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.dept_id = departments.id`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                console.log();
                console.table(res, ["id", "first", "last", "role", "salary", "department", "manager"]);
            }
            wait_to_resolve(resolve);
        });
    });
}

const view_all_roles = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT roles.id AS id, roles.title AS title, roles.salary AS salary,
        departments.dept_name AS department
        FROM roles
        INNER JOIN departments ON roles.dept_id = departments.id`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                console.log();
                console.table(res, ["id", "title", "salary", "department"]);
            }
            wait_to_resolve(resolve);
        });
    })
}

module.exports = { view_all_emps, view_all_roles, wait_to_resolve };