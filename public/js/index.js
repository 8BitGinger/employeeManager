var inquirer = require("inquirer");

const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'dolphin',
    database: 'employees'
  },
  console.log(`Connected to the company database.`)
);

async function deptChoices() {
  const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'dolphin',
      database: 'employees'
    },
  ).promise();

  const departmentQuery = `SELECT name FROM department;`;
  const departments = await db.query(departmentQuery);
  //console.log(departments[0]);

  return departments[0];
  
};

async function manageChoices() {
    const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'dolphin',
      database: 'employees'
    },
  ).promise();
  
  const manageQuery = `SELECT first_name FROM employee;`;
  const managers = await db.query(manageQuery);
  //console.log(managers[0]);
  return managers[0];
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const empQuestions = [
  {
    name: "new_first_name",
    type: "input",
    message: "What is the New employee's First Name?"
  },

  {
    name: "new_last_name",
    type: "input",
    message: "What is the New employee's Last Name?"
  },

  {
    name: "new_department_name",
    type: "list",
    message: "What is the Department for the New Employee?",
    choices: [
      // departments[0],
      "Sales",
      "Engineering",
      "Finance",
      "Legal",

    ]},
    {
    name: "new_salary",
    type: "input",
    message: "What is the Salary for the New Employee?"

    },
    {
      name: "new_manager",
      type: "list",
      message: "Who is the Manager over the New Employee?",
      choices: [
        // managers[0],
        "Micheal Scott",
        "David Wallace",

      ]
    },
  ]

  const deptQuestions = [
    {
      name: "new_dept",
      message: "What is the name of the Department?",
      type: "input"
    },
  ]


function startUp() {
  
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employees",
        "Add Departments",
        "Add Roles",
        "Update Employee Role",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View All Employees":
          empAllSearch();
          break;
        case "View All Departments":
          deptSearch();
          break;
        case "View All Roles":
          roleSearch();
          break;
        case "Add Employees":
          addEmp();
          break;
        case "Add Departments":
          addDept();
          break;
        case "Add Roles":
          addRole();
          break;
        case "Update Employee Roles":
          updateEmpRole();
          break;
        case "exit":
          console.log(`

                               ▄█▄▄▄█▄
                        ▄▀    ▄▌─▄─▄─▐▄    ▀▄
                        █▄▄█  ▀▌─▀─▀─▐▀  █▄▄█
                         ▐▌    ▀▀███▀▀    ▐▌
                        ████ ▄█████████▄ ████
                        
                          ╔═✵✵✵═══════════╗
                          Terminate Program
                          ╚══════════✵✵✵══╝ 

          `);
            process.exit();
          break;
      }
    });
};

function empAllSearch() {
  db.query("SELECT * from employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
};

function deptSearch() {
  db.query("SELECT * from department", function(err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
};

function roleSearch() {
  db.query("SELECT * from role", function(err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
};

function addEmp() {
  deptChoices();
   inquirer.prompt(empQuestions).then(answers => {
    db.query(  "INSERT INTO employee (first_name, last_name, department_name, salary, manager_id) VALUES (`${new_first_name}`, `${new_last_name}`, `${new_dept_name}`, `${new_salary}`, `${new_manager}`)", function(err, res) {
      if (err) throw err;
      console.table(res);
     
           //"VALUES", (`${new_first_name}`, `${new_last_name}`, `${new_dept_name}`, `${new_salary}`, `${new_manager}`)"
      startUp();
    })
  });
};

function addDept() {
  manageChoices();
  console.log()
  inquirer.prompt(deptQuestions).then(answers => {
    db.query(  "INSERT INTO department (name) VALUES (`${new_dept})", function(err, res) {
      if (err) throw err;
      console.table(res);
     
           //"VALUES", (`${new_first_name}`, `${new_last_name}`, `${new_dept_name}`, `${new_salary}`, `${new_manager}`)"
      startUp();
    })
  });
};
  

function firstStart() {
  console.log(`
  ___________________________________________________________________________
  
                                    
                    ▐▓█▀▀▀▀▀▀▀▀▀█▓▌ █████
                    ▐▓█   ▀  ▀  █▓▌ █▄▄▄█
                    ▐▓█   *~~*  █▓▌ █▄▄▄█
                    ▐▓█▄▄▄▄▄▄▄▄▄█▓▌ █***█
                        ▄▄███▄▄     █████


██████  ███  ███  ██████  ██       █████   ██   ██  ██████  ██████
██       ██__██   ██  ██  ██      ██   ██  ██   ██  ██      ██   
████    ██ ██ ██  █████   ██      ██   ██  ███████  ████    ████
██      ██    ██  ██      ██   █  ██   ██       ██  ██      ██
██████  ██    ██  ██      ██████   █████    ██████  ██████  ██████ 

███  ███   ████   ██  ██  ████   ████  █████ █████▄
 ██__██   ██  ██  ███_██ ██  ██ ██   █ ██    ██  ██
██ ██ ██  ██████  ██ ███ ██████ ██  ▄▄ ████  █████
██    ██  ██  ██  ██  ██ ██  ██ ██   █ ██    ██ █▄
██    ██  ██  ██  ██  ██ ██  ██  ████  █████ ██  ██  CRM
____________________________________________________________________________
  `);
  startUp();
};


firstStart();
