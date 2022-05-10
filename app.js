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

// Inital inquirer prompt

const Main = () => {
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
                addDepartment();
            } else if (option == 'Add a Role?') {
                addRole()
            } else if (option == 'Add an Employee?') {
                addWorker()
            } else if (option == 'Update an Employee Role?') {
                updateRole()
            } else if (option == 'Quit') {
                Quit();
            } else {
                console.log("Uh Oh, You have hit a dead end! Try another selection")
            }
        });
}


function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw error;
        console.table(results);
        Main();
    });
}

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) throw error;
        console.table(results);
        Main();
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) throw error;
        console.table(results);
        Main();
    });
}


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newdepartment',
            message: 'What is the name of the department?'
        }
    ]).then(function (data) {
        db.query("INSERT INTO department SET ?", {
            dept_name: data.newdepartment
        },
            function (err) {
                if (err) throw err
                console.table(data);
                Main();
            }
        )

    })
}

function addRole() {
    db.query(`SELECT department.id, department.dept_name FROM department`, (err, results) => {
        const deparmentList = results.map((obj) => ({ name: obj.dept_name, value: obj.id }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the new role?",
               
            },
            {
                type: "list",
                message: "Please choose the department for the role?",
                name: "department",
                choices: deparmentList
            }
        ]).then(function (data) {
            db.query("INSERT INTO roles SET ?", {
                title: data.title,
                salary: data.salary,
                department_id: data.department,

            },
                function (err) {
                    if (err) throw err
                    console.log("Success!");
                    Main();
                }
            )

        });
    });
}

function addWorker() {
    db.query(`SELECT id, first_name, last_name FROM employees WHERE manager_id IS NULL`, function (err, results) {
        const managerOptions = results.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

        inquirer.prompt([
            {
                type: "input",
                name: "first",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "manager",
                message: "Who is this employee's manager?",
                choices: managerOptions
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: chooseRole()
            }
        ]).then(function (data) {
            let editedroleId = chooseRole().indexOf(data.role) + 1;
            console.log(editedroleId)
            let managerId = managerOptions.indexOf(results.managerid)
            db.query("INSERT INTO employees SET ?", {
                first_name: data.first,
                last_name: data.last,
                manager_id: managerId,
                roles_id: editedroleId

            },
                function (err) {
                    if (err) throw err
                    console.table(data);
                    Main();
                }
            )

        });
    })
}

let roleChoices = [];
function chooseRole() {
    db.query(`SELECT roles.title FROM roles`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            for (var i = 0; i < results.length; i++) {
                roleChoices.push(results[i].title);
            }
        })
    return roleChoices;
};

function updateRole (){
db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees 
            JOIN roles ON employees.roles_id = roles.id`, (err, results) => {
                const employeeChoices = results.map(({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value: id}));   
                inquirer.prompt([
                    {
                        name: "name",
                        type: "list",
                        message: "Please choose which employee:",
                        choices: employeeChoices
                    },
                    {
                        name: "role", 
                        type: "list", 
                        message: "Enter the Employee's new role:",
                        choices: chooseRole()
                    }
    ]).then((data) => {
        let roleId = chooseRole().indexOf(data.role) +1
        db.query(`UPDATE employees SET roles_id = ${roleId} WHERE id = ${data.name}`, 
            (err,results) => {
                if (err) console.log(err)
                else console.log('Employee Update was Successful\r\n')
                Main();
            }
                    
        )
     });
    });}


function Quit() { process.exit(1);}

Main();
