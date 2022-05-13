### Apache-2.0 License
 [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# Company Database Manager

## Table of Contents

- [Description](#Description)

- [Installation](#Installation)

- [Features](#Features)

- [Contribute](#Contribute)

## Description
This is a command line program used as an interface for a user to manage their company's employees, roles, and departments. This is meant to make it easy to interact with a database without having to write a single line of code. To do so, it uses node.js, inquirer, the mysql2 node module, and mysql. This program utilizes the CRUD (Create, Read, Update, and Delete) methods to interact with the database in simple, predictable ways.
This code could be re-used in the future to manage another type of database. Also, while this is only a backend program, the functions could be used in an express app to connect these with a front-end application.

## Installation
> Note: To install this app, first make sure you have [node.js](https://nodejs.org/it/download/) and [mysql](https://dev.mysql.com/downloads/installer/) installed.
To check this, run `node -v`, and `mysql -V` in a command prompt.

Once the above programs are installed, clone the github repository and navigate to the company_data_hub/ directory. After that, run `npm i` to install all it's dependencies. Once that's done, navigate to the db/ directory. Run `mysql -u root -p` and enter your mysql password. Then you can run `source schema.sql` to create the database, and `source schema.sql` for some generic starting data. You will be able to delete any data you don't want later.
Once you have done all of the above, run `npm start` from anywhere within the company_data_hub/ directory to start the app.

## Features

- View all employees, roles, and departments alongside their relevent information.
- Add a new employee, role, or department by answering a few simple questions.
- Update an employee's role if their position changes.
- Delete any employee, role, or department you no longer need in your database.

## Contribute
If you would like to contribute, or you find a bug, please [email me](mailto:PhoenixStaley_Developer@outlook.com).
