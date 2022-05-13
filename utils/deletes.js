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
                console.log(`${res.first_name} ${res.last_name} deleted from database!`);
                wait_to_resolve(resolve);
            });
        });
    });
}


// const delete_employee = (connection) => {
//     return new Promise((reject, resolve) => {
//         try {
//             connection.query(`SELECT first_name, last_name FROM employees`, (err, results) => {
//                 const emps = results.map(obj => obj.first_name + " " + obj.last_name);
//                 inquirer.prompt([{
//                     type: "list",
//                     message: "Which employee would you like to delete?",
//                     choices: emps,
//                     name: "choice"
//                 }])
//                 .then(res => {
//                     emp_name = res.choice.split(" ");
//                     connection.query(`DELETE FROM employees
//                     WHERE first_name = ?
//                     AND last_name = ?`,
//                     [emp_name[0], emp_name[1]], (err, results) => {
//                         console.log(`${res.choice} has been deleted.`);
//                         wait_to_resolve(resolve);
//                     });
//                 });
//             });
//         } catch (e) {
//             reject(e);
//         }
//         // get_roles_emps(reject, connection, (roles, emps) => {
//         //     inquirer.prompt([{
//         //         type: "list",
//         //         message: "Which employee would you like to delete?",
//         //         choices: emps,
//         //         name: "full_name"
//         //     }])
//         //     // .then(employee => {
//         //     //     return inquirer.prompt([{
//         //     //         type: "list",
//         //     //         message: `Are you sure you want to delete ${employee.full_name}?`,
//         //     //         choices: ["Yes", "No"],
//         //     //         name: "will_continue"
//         //     //     }])
//         //     //     .then(cont => {
//         //     //         if (cont.will_continue === "Yes") {
//         //     //             return employee;
//         //     //         } else {
//         //     //             resolve();
//         //     //         }
//         //     //     });
//         //     // })
//         //     .then(employee => {
//         //         emp_name = employee.full_name.split(" ");
//         //         connection.query(`DELETE FROM employees
//         //         WHERE first_name = ?
//         //         AND last_name = ?`,
//         //         [emp_name[0], emp_name[1]],
//         //         (err, results) => {
//         //             if (err) {
//         //                 reject(err);
//         //             }
//         //             console.log(`${employee.full_name} was deleted from your database.`);
//         //             wait_to_resolve(resolve);
//         //         });
//         //     });
//         // });
//     });
// }

module.exports = { delete_employee };