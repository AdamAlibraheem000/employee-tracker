const inquirer = require("inquirer");
const fs = require("fs");

function mainMenu() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "Choose from the following options",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
        ],
      },
    ])
    .then((choice) => {
      switch (choice.main) {
        case "View all departments":
          console.log("departments");
          break;
        case "View all roles":
          console.log("roles");
          break;
        case "View all employees":
          console.log("employees");
          break;
        case "Add a department":
          console.log("Add a department");
          break;
        case "Add a role":
          console.log("Add a role");
          break;
        case "Add an employee":
          console.log("Add an employee");
          break;
        case "Update employee role":
          console.log("Update employee role");
          break;
        default:
          console.log("Wrong input. Try again");
      }
    });
}

function departments() {
  // formatted table showing department names & ids
}

function roles() {
  // display job title, role ID, department, salary
}

function employees() {
  // formatted table displaying:
  // employee id, first name, last name, job title, departments, salaries, & managers
}

function addDepartment() {
  // prompt to add name of department
  // department is added to database
}

function addRole() {
  // prompt to enter name, salary, & department for role
  // role is added to database
}

function addEmployee() {
  // prompt enter the employee’s first name, last name, role, and manager, and that employee is added to the database.
}

function addEmployeeRole() {
  // prompted to select an employee to update and their new role and this information is updated in the database
}

mainMenu();
