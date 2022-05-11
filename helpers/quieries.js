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
        roles.title AS role, departments.dept_name AS department
        FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.dept_id = departments.id`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                console.log();
                console.table(res, ["id", "first", "last", "role", "department", "manager"]);
            }
            wait_to_resolve(resolve);
        });
    });
}

module.exports = { view_all_emps, wait_to_resolve };