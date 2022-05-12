const { get_roles_emps, wait_to_resolve } = require("./quieries");
const inquirer = require("inquirer");

const update_role = (connection) => {
    return new Promise((resolve, reject) => {
        get_roles_emps(reject, connection, (roles, emps) => {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Who's role would you like to update?",
                    choices: emps,
                    name: "emp"
                },
                {
                    type: "list",
                    message: "What is their new role?",
                    choices: roles,
                    name: "new_role"
                }
            ])
            .then(res => {
                emp_name = res.emp.split(" ");
                connection.query(`UPDATE employees
                    SET 
                        role_id = (
                            SELECT id FROM company_db.roles WHERE title = ?
                        )
                    WHERE 
                        first_name = ?
                    AND
                        last_name = ?;`,
                    [res.new_role, emp_name[0], emp_name[1]],
                    (err, result) => {if (err) {reject(err)}});
                console.log(`${emp_name[0]} ${emp_name[1]}'s role was updated.`);
                wait_to_resolve(resolve);
            });
        });
    });
}

module.exports = { update_role };