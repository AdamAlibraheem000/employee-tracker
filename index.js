const inquirer = require("inquirer");
const fs = require("fs");
const db = require("./db/connection");

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
  // DONE

  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("error");
    }
    console.log(rows);
  });
}

function roles() {
  // display job title, role ID, department, salary
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("error");
    }
    console.log(rows);
  });
}

function employees() {
  // formatted table displaying:
  // employee id, first name, last name, job title, departments, salaries, & managers
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("error");
    }
    console.log(rows);
  });
}

function addDepartment() {
  // prompt to add name of department
  // department is added to database
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new department name: ",
        name: "newDep",
        validate: (newDepVal) => {
          if (newDepVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      console.log(answer.newDep);
      const addDeprt = answer.newDep;
      const sql = `INSERT INTO department(d_name) VALUES ("${addDeprt}")`;
      db.query(sql, (err, row) => {
        if (err) {
          console.log("error");
        }
        console.log(addDeprt + " was added");
      });
    });
}

function addRole() {
  // prompt to enter name, salary, & department for role
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee name: ",
        name: "newName",
        validate: (newNameVal) => {
          if (newNameVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter salary: ",
        name: "newSalary",
        validate: (newSalaryVal) => {
          if (newSalaryVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter department number: ",
        name: "newDepRole",
        validate: (newDepRoleVal) => {
          if (newDepRoleVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
    ])
    .then((roleAnswers) => {
      console.log(roleAnswers.newName);
      console.log(roleAnswers.newSalary);
      console.log(roleAnswers.newDepRole);
      const addName = roleAnswers.newName;
      const addSalary = roleAnswers.newSalary;
      const addDepRole = roleAnswers.newDepRole;
      const sql = `INSERT INTO roles(title, salary, department_id) VALUES 
      ("${addName}", "${addSalary}", "${addDepRole}")`;
      db.query(sql, (err, row) => {
        if (err) {
          console.log("error");
        }
        console.log(
          addName + " " + addSalary + " " + addDepRole + " was added"
        );
      });
    });
  // role is added to database
}

function addEmployee() {
  // prompt enter the employee’s first name, last name, role, and manager, and that employee is added to the database.
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee first name: ",
        name: "firstName",
        validate: (firstNameVal) => {
          if (firstNameVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter employee last name: ",
        name: "lastName",
        validate: (lastNameVal) => {
          if (lastNameVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter employee role: ",
        name: "empRole",
        validate: (empRoleVal) => {
          if (empRoleVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter employee's manager: ",
        name: "empManager",
        validate: (empManagerVal) => {
          if (empManagerVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
    ])
    .then((empAnswers) => {
      console.log(empAnswers.firstName);
      console.log(empAnswers.lastName);
      console.log(empAnswers.empRole);
      console.log(empAnswers.empManager);
    });
}

function addEmployeeRole() {
  // prompted to select an employee to update and their new role and this information is updated in the database

  // SQL command to display all employees

  // prompts to choose emp & role
  inquirer
    .prompt([
      {
        type: "input",
        message: "Choose employee to update: ",
        name: "empUpdate",
        validate: (empUpdateVal) => {
          if (empUpdateVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter new role for employee: ",
        name: "empUpdateRole",
        validate: (updateRoleVal) => {
          if (updateRoleVal) {
            return true;
          } else {
            console.log("Input required!");
            return false;
          }
        },
      },
    ])
    .then((updateAnswers) => {
      console.log(updateAnswers.empUpdate);
      console.log(updateAnswers.empUpdateRole);
    });

  // SQL to update database
}

// mainMenu();
// departments();
// roles();
// employees();
// addDepartment();
addRole();
// addEmployee();
// addEmployeeRole();
