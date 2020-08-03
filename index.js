const mysql = require("mysql");
const inquirer = require("inquirer"); 
require("console.table");

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
  whichAction();
});


function whichAction() {
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
        "Update an employee",
        "Exit"
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

        case "View departments":
          viewDepartments();
          break;

        case "View roles":
          viewRoles();
          break;
        
        case "View all employees":
          viewEmployees();
          break;
          
        case "View employees by department":
          viewEmployeesByDepartment();
          break;
          
        case "View all employees by role":
          viewEmployeesByRole();
          break;  

        case "View all employees by manager":
          viewEmployeesByManager();
          break;    
    
        case "Update a role":
          updateRole();
          break;     
        
        case "Update an employee":
          updateEmployee();
          break; 

        case "Delete a department":
          deleteDepartment();
          break; 
          
        case "Delete a role":
          deleteRole();
          break; 

        case "Delete an employee":
          deleteEmployee();
          break; 

        case "Exit":
          connection.end();
          break; 
      }
    });
}

async function addDepartment() {
  const department = await
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(function(answer) {
      console.log("Inserting a new department...\n");
      return connection.query("INSERT INTO department SET ?",
      { department: answer.department }, function(err, res) {
        whichAction();
      });
    });
};

async function addRole() {
  inquirer
  .prompt(
    {
      name: "role",
      type: "input",
      message: "What role would you like to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role (please use only numbers)?"
    }      
    ///////////////////////////// STILL NEED DEPARTMENT /////////////////////// 
  )
  .then(function(answer) {
    console.log("Inserting a new role...\n");
    var query = connection.query("INSERT INTO role SET ?",
    { role: answer.role }, function(err, res) {
      whichAction();
    });
  });
};

async function addEmployee() {
  inquirer
  .prompt(
    {
      name: "firstname",
      type: "input",
      message: "What is the first name of the employee that you would like to add?"
    },
    {
      name: "lastname",
      type: "input",
      message: "What is the last name of the employee that you would like to add?"
    }
    /////////////////////////STILL NEED ROLE//////////////////////////////////role_id 
    /////////////////////////STILL NEED MANAGER///////////////////////////////manager_id       
  )
  .then(function(answer) {
    console.log("Inserting a new employee...\n");
    var query = connection.query("INSERT INTO employee SET ?",
    { first_name: answer.firstname,
      last_name: answer.lastname
     }, function(err, res) {
      whichAction();
    });
  });
};

async function viewDepartments() {
  console.log("Viewing all departments...\n");
  var query = connection.query("SELECT * FROM department", function(err,res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
          res[i].department.name + res[i].department.id
      )
    };
    whichAction();
  }); 
};

async function viewRoles() {
  console.log("Viewing all roles...\n");
  var query = connection.query("SELECT * FROM role LEFT JOIN department ON role.deparmentId = deparmentId", function(err,res) { 
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
          res[i].role.title + ", Role Id: " + res[i].role.id + ", \n Salary: $" + res[i].role.salary + "\n" +           
          res[i].department.name + " Department, Dept #" + res[i].department.id +
          "---------------------------------------"
      )
    };
    whichAction();
  }); 
}; 

async function viewEmployees() {
  console.log("Viewing all employees...\n");
  var query = connection.query((
    "SELECT * FROM employee LEFT JOIN role ON employee.roleId = roleId LEFT JOIN department ON role.deparmentId = deparmentId"), 
    function(err,res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Employee: " +
          res[i].employee.first_name + res[i].employee.last_name +
          " || : Role" +
          res[i].role.title +
          " || Salary: " +
          res[i].role.salary +
          " || Department: " +
          res[i].department.name +
          "---------------------------------------"
      )
    };
    whichAction();
  });
};

async function viewEmployeesByDepartment() {
  console.log("Viewing employees by department...\n");
  var query = connection.query("SELECT * FROM employee LEFT JOIN department ON employee.departmentId = departmentId");
  console.log(query);
};

async function viewEmployeesByRole() {
  console.log("Viewing employees by role...\n");
  var query = connection.query("SELECT * FROM employee ");//////WHERE; 
};

async function viewEmployeesByManager() {
  console.log("Viewing employees by manager...\n");
  var query = connection.query("SELECT * FROM employee ");//////WHERE; 
};

async function updateRole() {
  var query = connection.query("UPDATE  role");
};

async function updateEmployee() {
  var query = connection.query("UPDATE  employee");
};

async function deleteDepartment() {
  var query = connection.query("DELETE  department");
};

async function deleteRole() {
  var query = connection.query("DELETE role WHERE id = ?", roleId);
  console.log(query);
};

async function deleteEmployee() {
  var query = connection.query("DELETE employee WHERE id = ?", employeeId);
  console.log(query);
};