const { get_roles_emps, wait_to_resolve } = require("./quieries");
const inquirer = require("inquirer");

const add_employee = (connection) => {
    return new Promise((resolve, reject) => {
        get_roles_emps(reject, connection, (roles, emps) => {
            emps.push("None");
            inquirer.prompt([
                {
                    type: "input",
                    message: "Employee's first name:",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "Employee's last name:",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "What is their role?",
                    choices: roles,
                    name: "role"
                },
                {
                    type: "list",
                    message: "Who is their manager?",
                    choices: emps,
                    name: "manager"
                }
            ])
            .then(res => {
                manager_name = res.manager.split(" ");
                if (res.manager === "None") {
                    connection.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES
                    (?, ?, (SELECT id FROM roles WHERE roles.title = ?), NULL)`,
                    [res.first_name, res.last_name, res.role],
                    (err, results) => {if (err) {reject(err)}});
                } else {
                    connection.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id)
                    VALUES
                    (?,
                    ?,
                    (SELECT id FROM roles WHERE roles.title = ?),
                    (SELECT id FROM employees AS e WHERE e.first_name = ? AND e.last_name = ?));`,
                    [res.first_name, res.last_name, res.role, manager_name[0], manager_name[1]],
                    (err, results) => {if (err) {reject(err)}});
                }
                console.log(`${res.first_name} ${res.last_name} added to database!`);
                wait_to_resolve(resolve);
            });
        });
    });
}

const add_role = (connection) => {
    return new Promise((resolve, reject) => {
        let deptartments;
        connection.query(`SELECT dept_name FROM departments`, (err, results) => {
            if (err) {
                reject(err);
            }
            deptartments = results.map(obj => obj.dept_name);
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the title of this role?",
                    name: "title"
                },
                {
                    type: "number",
                    message: "What is the salary for this position?",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "What department is this in?",
                    choices: deptartments,
                    name: "dept"
                }
            ])
            .then(res => {
                connection.query(`INSERT INTO roles(title, salary, dept_id)
                    VALUES
                    (?, ?, (
                        SELECT id FROM departments WHERE dept_name = ?
                        )
                    );`,
                    [res.title, res.salary, res.dept],
                    (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        console.log(`${res.title} added to the ${res.dept} department.`);
                        wait_to_resolve(resolve);
                    });
            });
        });
    });
}

module.exports = { add_employee, add_role };