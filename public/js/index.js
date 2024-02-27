const EventEmitter = require('eventemitter3');
const emitter = new EventEmitter();

var inquirer = require('inquirer');

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
    database: 'employees',
  },
  console.log(`Connected to the company database.`)
);

//this section is a WIP to get the table to appear as the list of choices through inquirer prompt.

// async function deptChoices() {
//   const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // MySQL password
//       password: 'dolphin',
//       database: 'employees'
//     },
//   ).promise();

//   const departmentQuery = `SELECT name FROM department;`;
//   const departments = await db.query(departmentQuery);
//   //console.log(departments[0]);

// };

// async function roleChoices() {
//   const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // MySQL password
//       password: 'dolphin',
//       database: 'employees'
//     },
//   ).promise();

//   const roleQuery = `SELECT name FROM department;`;
//   const roles = await db.query(roleQuery);
//   //console.log(departments[0]);

//   return roles[0];

// };

// async function manageChoices() {
//     const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // MySQL password
//       password: 'dolphin',
//       database: 'employees'
//     },
//   ).promise();

//   const manageQuery = `SELECT first_name FROM employee;`;
//   const managers = await db.query(manageQuery);
//   //console.log(managers[0]);
//   return managers[0];
// };

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const empQuestions = [
  {
    name: 'new_first_name',
    type: 'input',
    message: "What is the New employee's First Name?",
  },

  {
    name: 'new_last_name',
    type: 'input',
    message: "What is the New employee's Last Name?",
  },

  {
    name: 'new_department_name',
    type: 'list',
    message: 'What is the Department for the New Employee?',
    choices: [
      // departments[0],
      'Sales',
      'Engineering',
      'Finance',
      'Legal',
    ],
  },
  {
    name: 'new_role',
    type: 'input',
    message: 'What is Role for the New Employee?',
  },
  {
    name: 'new_manager',
    type: 'list',
    message: 'Who is the Manager over the New Employee?',
    choices: [
      // managers[0],
      'Micheal Scott',
      'David Wallace',
    ],
  },
];

const deptQuestions = [
  {
    name: 'new_dept',
    message: 'What is the name of the Department?',
    type: 'input',
  },
];

const roleQuestions = [
  {
    name: 'new_title',
    message: 'What is the Name of the New Role?',
    type: 'input',
  },
  {
    name: 'new_salary',
    message: 'What is the Salary for this Role?',
    type: 'input',
  },
  {
    name: 'new_department_id',
    message: 'What Department is the Role under?',
    type: 'input',
  },
];

function startUp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'Add Employees',
        'Add Departments',
        'Add Roles',
        'Update Employee Role',
        'Delete Records',
        'exit',
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case 'View All Employees':
          empAllSearch();
          break;
        case 'View All Departments':
          deptSearch();
          break;
        case 'View All Roles':
          roleSearch();
          break;
        case 'Add Employees':
          addEmp();
          break;
        case 'Add Departments':
          addDept();
          break;
        case 'Add Roles':
          addRole();
          break;
        case 'Update Employee Role':
          updateEmpRole();
          break;
        case 'Delete Records':
          deleteRecords();
          break;
        case 'exit':
          console.log(`

                                            ╔══════════════════════════════════════╗ 
                                          * █ Terminate, I mean Manage, all Humans █
                                        *   ╚══════════════════════════════════════╝
                                      *
                               ▄█▄▄▄█▄      
                        ▄▀    ▄▌─▄─▄─▐▄    ▀▄
                        █▄▄█  ▀▌─▀─▀─▐▀  █▄▄█
                         ▐▌    ▀▀███▀▀    ▐▌
                        ████ ▄█████████▄ ████
                        
                          ╔═✵✵✵════════════╗
                          Program Terminated
                          ╚═══════════✵✵✵══╝ 

          `);
          process.exit();
          break;
      }
    });
}

function empAllSearch() {
  console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`);
  console.log('Displaying Employees:');

  db.query('SELECT * from employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
}

function deptSearch() {
  console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`);
  console.log('Displaying Departments:');

  db.query('SELECT * from department', function (err, res) {
    if (err) throw err;

    console.table(res);
    startUp();
  });
}

function roleSearch() {
  console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`);
  console.log('Displaying Roles:');

  db.query('SELECT * from role', function (err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
}

function addEmp() {
  console.log('Displaying Roles for Reference:');
  db.query('SELECT * from role', function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer.prompt(empQuestions).then((answers) => {
      const answerArry = [
        answers.new_first_name,
        answers.new_last_name,
        answers.new_department_name,
        answers.new_role,
        answers.new_manager,
      ];
      const newQuery =
        'INSERT INTO employee (first_name, last_name, department_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)';
      db.query(newQuery, answerArry, function (err, res) {
        if (err) throw err;

        console.log('Employee Added!');
        empAllSearch();
      });
    });
  });
}

function addDept() {
  console.log('Displaying Departments:');

  db.query('SELECT * from department', function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer.prompt(deptQuestions).then((answers) => {
      let newDept = answers.new_dept;
      let newQuery = 'INSERT INTO department (name) VALUES (?)';
      db.query(newQuery, newDept, function (err, res) {
        if (err) throw err;

        console.log('Department Added!');
        deptSearch();
      });
    });
  });
}

function addRole() {
  console.log('Displaying Roles:');

  db.query('SELECT * from role', function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer.prompt(roleQuestions).then((answers) => {
      let newRole = [
        answers.new_title,
        answers.new_salary,
        answers.new_department_id,
      ];
      let newQuery =
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      db.query(newQuery, newRole, function (err, res) {
        if (err) throw err;

        console.log('Role Added!');
        roleSearch();
      });
    });
  });
}

function updateEmpRole() {
  console.log('Displaying Tables:');

  db.query('SELECT * from employee', function (err, res) {
    if (err) throw err;
    console.table(res);

    db.query('SELECT * from role', function (err, res) {
      if (err) throw err;
      console.table(res);

      inquirer
        .prompt([
          {
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the employee?',
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the employee?',
          },
          {
            name: 'updatedRole',
            type: 'input',
            message: 'What is the New Role of the employee?',
          },

          {
            name: 'updatedDept',
            type: 'input',
            message: 'What is the New Department of the employee?',
          },
        ])
        .then(function (answers) {
          var query =
            'UPDATE employee SET role_id=?, department_name=? WHERE first_name=? AND last_name=?';
          db.query(
            query,
            [
              answers.updatedRole,
              answers.updatedDept,
              answers.firstName,
              answers.lastName,
            ],
            function (err, data) {
              if (err) throw err;
              console.log('Employee has been updated');

              var query = 'SELECT * FROM employee;';
              db.query(query, function (err, data) {
                if (err) throw err;
                console.table(data);
                startUp();
              });
            }
          );
        });
    });
  });
}
//This is the function that will allow deleting of the records.
//We will want to delete Depts, Roles, and Employees
function deleteRecords() {
  console.log('Delete Screen');
  inquirer
    .prompt({
      name: 'delete',
      type: 'list',
      message: 'What would you like to delete?',
      choices: ['Departments', 'Roles', 'Employees', 'Back'],
    })
    .then(function (answers) {
      switch (answers.delete) {
        case 'Departments':
          delDept();
          break;
        case 'Roles':
          delRole();
          break;
        case 'Employees':
          delEmp();
          break;
        case 'Back':
          console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`);
          startUp();
          console.log('Back to Main');
          break;
      }
    });
}

function delDept() {
  console.log('Displaying Departments:');

  db.query('SELECT * from department', function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt({
        name: 'deleteDeptSel',
        type: 'input',
        message: 'Which Department would you like to delete?',
      })
      .then((answer) => {
        let delDept = answer.deleteDeptSel;

        let newQuery = 'DELETE FROM department WHERE NAME=?';
        db.query(newQuery, delDept, function (err, res) {
          if (err) throw err;

          console.log('Successfuly Deleted');
          deptSearch();
        });
      });
  });
}

function delRole() {
  console.log('Displaying Roles:');

  db.query('SELECT * from role', function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt({
        name: 'deleteRoleSel',
        type: 'input',
        message: 'Which Role would you like to delete?',
      })
      .then((answer) => {
        let delRole = answer.deleteRoleSel;

        let newQuery = 'DELETE FROM role WHERE title=?';
        db.query(newQuery, delRole, function (err, res) {
          if (err) throw err;

          console.log('Successfuly Deleted');
          roleSearch();
        });
      });
  });
}

function delEmp() {
  console.log('Displaying Employees:');

  db.query('SELECT * from employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt({
        name: 'deleteEmpSel',
        type: 'input',
        message: 'What is the ID of the Employee you wish to Delete?',
      })
      .then((answers) => {
        let delEmp = answers.deleteEmpSel;

        let newQuery = 'DELETE FROM employee WHERE id=?';
        db.query(newQuery, delEmp, function (err, res) {
          if (err) throw err;

          console.log('Successfuly Deleted');
          empAllSearch();
        });
      });
  });
}

function firstStart() {
  console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                                
                       ▐▓█▀▀▀▀▀▀▀▀▀█▓▌ █████
                       ▐▓█   ▀  ▀  █▓▌ █▄▄▄█
                       ▐▓█   *~~*  █▓▌ █▄▄▄█
                       ▐▓█▄▄▄▄▄▄▄▄▄█▓▌ █***█
                           ▄▄███▄▄     █████


   ██    ██ ▄█████▄ █████▄ ██  ██ ██████ ▄█████▄ █████▄ ▄████▄ ██████
   ██    ██ ██   ██ ██  ██ ██_▄█  ██     ██   ██ ██  ██ ██  ██ ██
   ██_██_██ ██   ██ █████  ████   ████   ██   ██ █████  ██     ████
    ██  ██  ██   ██ ██ █▄  ██ ██  ██     ██   ██ ██ █▄  ██  ██ ██
     █  █    █████  ██  ██ ██  ██ ██      █████  ██  ██  ████  ██████


          ▄█  █▄   ▄████▄  ██  ██ ▄████▄ ▄█████▄ █████ █████▄
         ▄██▄▄██▄  ██  ██  ███_██ ██  ██ ██   ██ ██    ██  ██
         ██ ██ ██  ██████  ██ ███ ██████ ██  ▄▄▄ ████  █████  
         ██    ██  ██  ██  ██  ██ ██  ██ ██   ██ ██    ██ █▄
         ██    ██  ██  ██  ██  ██ ██  ██  █████  █████ ██  ██ CRM

                                                  -Workforce not inluded!

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  `);
  startUp();
}

// deptChoices();

firstStart();
