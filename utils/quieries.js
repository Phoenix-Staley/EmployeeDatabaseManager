// This file has the functions to select and view different tables
// This also has the wait_to_resolve, get_depts, and get_roles_emps functions that are used in the other utils

const inquirer = require("inquirer");

// Waits for user input before resolving the given promise
const wait_to_resolve = (resolve) => {
    inquirer.prompt([{
        type: "list",
        choices: ["Ok"],
        message: "Press 'Ok' to continue",
        name: "continue"
    }])
    .then(res => resolve());
}

// Queries the roles and employees tables and passes it to the callback function
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

const get_depts = (reject, connection, cb) => {
    connection.query(`SELECT dept_name FROM departments`, (err, res) => {
        if (err) {
            reject(err);
        } else {
            // Creates an array of department names
            departments = res.map(obj => obj.dept_name)
            cb(departments);
        }
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

// Displays the sum of all employee salaries in a chosen department 
const view_dept_budget = (connection) => {
    return new Promise((resolve, reject) => {
        get_depts(reject, connection, (depts) => {
            inquirer.prompt([{
                type: "list",
                message: "Which department's salary budget would you like to view?",
                choices: depts,
                name: "dept_name"
            }])
            .then(res => {
                connection.query(`SELECT SUM(Salary) AS sum FROM (SELECT employees.id AS ID,
                    roles.salary AS Salary, departments.dept_name AS Department
                    FROM employees
                    LEFT JOIN roles ON employees.role_id = roles.id
                    LEFT JOIN departments ON roles.dept_id = departments.id) AS emps WHERE Department = ?`,
                    res.dept_name, (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(`The sum of all salaries in teh ${res.dept_name} department is $${results[0].sum}.`);
                        }
                        wait_to_resolve(resolve);
                    });
            });
        });
    });
}

module.exports = { view_all_emps, view_all_roles, view_all_departments, view_dept_budget, get_roles_emps, get_depts, wait_to_resolve };