const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table')

// creates connection to my sql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
})

// connects it to the mysql server
 
connection.connect(function(err){
    if (err) throw err
    console.log("connected" + connection)
    options();
})

function options() {
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do in our database?',
            choices: [
                    'View all the employees?',
                    'View all the departments?',
                    'View all the roles?',
                    'Add an employee?',
                    'Add an department?',
                    'Add an role?',
                    'Update an existing employee role?',
                    'Remove an employee?',
                    'EXIT?'
                    ]
            }).then(function (answer) {

                switch (answer.action) {

                    case 'View all the employees':
                        viewAllEmployees();
                        break;

                    case 'View all the departments':
                        viewAllDepartments();
                        break;

                    case 'View all roles':
                        viewAllRoles();
                        break;

                    case 'Add an employee':
                        addEmployee();
                        break;

                    case 'Add an department':
                        addDepartment();
                        break;

                    case 'Add an role':
                        addRole();
                        break;

                    case 'Update an employee role':
                        updateRole();
                        break;

                    case 'Delete an employee':
                        deleteEmployee();
                        break;

                    case 'EXIT': 
                        exitApp();
                        break;

                    default:
                        break;

                }

        })

};



// see all the employees in the DB
function viewAllEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'Employees located');
        console.table('All Employees:', res); 
        options();
    })
};

// see all the departments in the DB
function viewAllDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        options();
    })
};

// view all the roles in the DB
function viewAllRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};




// add an employee to the DB
function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;



        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "Enter employee first name",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "Enter emplyee last name"
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "Enter employee manager ID "
                },
                {
                    name: 'role', 
                    type: 'list',

                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "Enter employee role"
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Employee has been added');
                        options();
                    })
                })
        })
};



// adds an department to the DB
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Add new department'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('New department added');
                console.table('All Departments:', res);
                options();
                })
            })
};

// adds an role to the database
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "Add new employee role"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter employee salary (numerical value)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('New employee role added');
                    console.table('All Roles:', res);
                    options();
                })
        })
    })
};

// updates an role in the DB
function updateRole() {

};

//  deletes an employee
function deleteEmployee() {

};

// exits the app
function exitApp() {
    connection.end();
};