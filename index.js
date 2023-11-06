
const inquirer = require('inquirer');

const starter= [
    {
        type: "list",
        name: "index",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
        ]
    }
]

inquirer
  .prompt(starter)
  .then((answers) => {
    console.log(answers.index);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!")
    } else {
      console.log(error)
    }
});