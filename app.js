const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = 3306;


//Connect to MySQL Database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '!Eagles8139!',
        database: 'employee_management'
    },
    console.log(`Connected to the database on port ${PORT}`)
);

const Prompt = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments?',
                    'View All Roles?',
                    'View All Employees?',
                    'Add a Department?',
                    'Add a Role?',
                    'Add an Employee?',
                    'Update an Employee Role?',
                    'Quit',
                ],
            },
        ]).then(data => {
            let option = data.option;
            console.log(option);
            if (option == 'View All Departments?') {
                //console.log("view depts");
                viewDepartments();
            } else if (option == 'View All Roles?') {
                viewRoles();
            } else if (option == 'View All Employees?') {
                viewEmployees();
            } else if (option == 'Add a Department?') {
                addDept();
            } else if (option == 'Add a Role?') {
                addRole()
            } else if (option == 'Add an Employee?') {
                addEmp()
            } else if (option == 'Update an Employee Role?') {
                updateRole()
            } else if (option == 'Quit') {
                Quit();
            } else {
                console.log("Uh Oh, You have hit a dead end! Try another selection")
            }
        });
}