const inquirer = require("inquirer");
const db = require("./db/connection");

function mainMenu() {
  inquirer
    .prompt([
      {
        //Add quit program option
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
          "Quit Program",
        ],
      },
    ])

    .then((choice) => {
      switch (choice.main) {
        case "View all departments":
          departments();
          break;
        case "View all roles":
          roles();
          break;
        case "View all employees":
          employees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Quit Program":
          console.log("Quit Program");
          process.exit(0);
          break;
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
    console.log("\n\n*********DEPARTMENTS**********");
    console.log(rows);
    console.log("\n\n");
    mainMenu();
  });
}

function roles() {
  // display job title, role ID, department, salary
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("error");
    }
    console.log("\n\n*********ROLES**********");
    console.log(rows);
    console.log("\n\n");
    mainMenu();
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
    console.log("\n\n*********EMPLOYEES TABLE**********");
    console.log(rows);
    console.log("\n\n");
    mainMenu();
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
      const addDeprt = answer.newDep;
      const sql = `INSERT INTO department(d_name) VALUES ("${addDeprt}")`;
      db.query(sql, (err, row) => {
        if (err) {
          console.log("error");
          console.log("\n\n");
          mainMenu();
        } else {
          console.log(addDeprt + " was added");
          console.log("\n\n");
          mainMenu();
        }
      });
    });
}

function addRole() {
  // prompt to enter name, salary, & department for role
  inquirer //Drop down for role
    .prompt([
      {
        type: "input",
        message: "Enter new role: ",
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
        message: "Enter salary for role: ",
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
        type: "list",
        message: "Choose department for role: ",
        name: "newDepRole",
        choices: ["Accounting", "Marketing", "Finance", "Human Resources"],
      },
    ])
    .then((roleAnswers) => {
      switch (roleAnswers.newDepRole) {
        case "Accounting":
          roleAnswers.newDepRole = 1;
          break;
        case "Marketing":
          roleAnswers.newDepRole = 2;
          break;
        case "Finance":
          roleAnswers.newDepRole = 3;
          break;
        case "Human Resources":
          roleAnswers.newDepRole = 4;
          break;
      }
      console.log(roleAnswers.newName);
      console.log(roleAnswers.newSalary);
      console.log(roleAnswers.newDepRole);
      const addName = roleAnswers.newName;
      const addSalary = roleAnswers.newSalary;
      const addDepRole = roleAnswers.newDepRole;
      const sql = `INSERT INTO roles(title, salary, department_id) VALUES 
      (?,?,?)`;
      const params = [addName, addSalary, addDepRole];
      db.query(sql, params, (err, row) => {
        if (err) {
          console.log("error");
          console.log("\n\n");
          mainMenu();
        } else {
          console.log(
            addName + " " + addSalary + " " + addDepRole + " was added"
          );
          mainMenu();
        }
      });
    });
  // role is added to database
}

function addEmployee() {
  // prompt enter the employee’s first name, last name, role, and manager, and that employee is added to the database.   //Drop down for role & manager
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
        message: "Enter employee role number: ",
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
      // console.log(empAnswers.firstName);
      // console.log(empAnswers.lastName);
      // console.log(empAnswers.empRole);
      // console.log(empAnswers.empManager);
      const addFirstName = empAnswers.firstName;
      const addLastName = empAnswers.lastName;
      const addEmpRole = empAnswers.empRole;
      const addEmpManager = empAnswers.empManager; //Manager???
      const sql = `INSERT INTO employees(first_name, last_name, role_id) VALUES 
      ("${addFirstName}", "${addLastName}", "${addEmpRole}")`;
      db.query(sql, (err, row) => {
        if (err) {
          console.log("error");
          console.log("\n\n");
          mainMenu();
        } else {
          console.log(
            addFirstName + " " + addLastName + " " + addEmpRole + " was added"
          );

          console.log("\n\n");
          mainMenu();
        }
      });
    });
}

function updateEmployeeRole() {
  // prompted to select an employee to update and their new role and this information is updated in the database

  // SQL command to display all employees
  const sqlDisplay = `SELECT * FROM employees`;
  console.log(sqlDisplay);

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

mainMenu();
// departments();
// roles();
// employees();
// addDepartment();
// addRole();
// addEmployee();
// addEmployeeRole();
