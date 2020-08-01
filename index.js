const mysql = require("mysql");
const inquirer = require("inquirer"); 

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeTrackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});


function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add a role",
        "Add an employee",
        "View a department",
        "View a role",
        "View an employee",
        "Update a role",
        "Update an employee"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add a department":
        addDepartment();
        break;

      case "Add a role":
        addRole();
        break;

      case "Add an employee":
        addEmployee();
        break;

      case "View a department":
        viewDepartment();
        break;

      case "View a role":
        viewRole();
        break;
      
      case "View an employee":
        viewEmployee();
        break; 
      
      case "Update a role":
        updateRole();
        break;     
      
      case "Update an employee":
        updateEmployee();
        break; 
      }
    });
}

function addDepartment() {

};

function addRole() {

};

function addEmployee() {
  
};

function viewDepartment() {

};

function viewRole() {

}; 

function viewEmployee() {

};

function updateRole() {

};

function updateEmployee() {

};