const viewAllEmps = (connection) => {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log(res);
        }
    });
}

module.exports = { viewAllEmps };