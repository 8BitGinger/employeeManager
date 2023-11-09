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



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


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
            process.exit();
          break;
      }
    });
};

function empAllSearch() {
  db.query(
    "SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.department_id = department.department_id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;",
    function(err, res) {
      if (err) throw err;
      console.table(res);
      startUp();
    }
  );
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



function firstStart() {
  console.log(`
  _______________________________________________________________________________________________________      
  |                                                                                                     |
  |                                     .*#&@@@@@@@@@@@@@@&#*.                                          |
  |                               ,&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/                                      |
  |                               %@@@@@@@@                @@@@@@@@&                                    |
  |                               &@@@@&/   @@@@*     @@@@    (&@@@&.                                   |
  |                               @@@@@@@@  @@@@@@@@@@@@@@  @@@@@@@@                                    |
  |                                       #@@@@@@@@@@@@@@@@&                                            |
  |                                     .@@@@@          @@@@@.                                          |
  |                                    %@@@@@   @@@@@@   @@@@@@                                         |
  |                                   @@@@@@@   &@@@@@   @@@@@@@                                        |
  |                                  *@@@@@@@@          @@@@@@@@#                                       |
  |                                  *@@@@@@@@@@@@@@@@@@@@@@@@@@#                                       |
  |                                   ..........................                                        |
  |                                                                                                     |                                                                       
  |            @@@@@@@                        @@@                                                       |
  |            @@@     @@ @@@  @@    @@@@@@   @@@  @@@@@&   @@  @@@   @@@@@@   @@@@@@                   |
  |            @@@@@@  @@@%&@@@%@@@@ @@@%&@@# @@@ @@@%&@@@  @@  @@@  @@@   @@ @@@   @@                  |
  |            @@@     @@@  @@@  @@@ @@@  @@@ @@@ @@@  @@@  @@  @@@  @@@@@@@  @@@@@@@                   |
  |            @@@     @@@  @@@  @@@ @@@%&@@  @@@ @@@@@@@@  @@_ @@@  @@@      @@@                       |
  |            @@@@@@@ @@@       @@@ @@@      @@@  @@@@@&       @@@   #@@@@    #@@@@                    |
  |                                  @@@                    @@@@@@/                                     |
  |                                                                                                     |                                              
  |               @@@@   @@@@                                                                           |
  |               @@#@@)(@@#@@ @@@@@@@   @@@@@@@   @@@@@@   @@@@@@@   @@@@@@  @@@@@                     |
  |               @@#%@@&@&/@@   _@@@@@  @@@  @@@   ___@@@  @@@ @@@  @@ ___@@ @@@        &&& &&&  &___& |
  |               @@   @    @@ @@   @@@  @@@  @@@ @@@  @@@  @@___@@  @@@      @@@        &   &_/  & | & |
  |               @@        @@  @@@@@@@@ @@@  @@@  @@@@@@@@     @@@   @@@@@@  @@@        &&& &  $ &   & |
  |                                                          @@@@@/                                     |
  |                                                                                                     |
  |                                                                                                     |
  |_____________________________________________________________________________________________________|
  `);
  startUp();
};

firstStart();
