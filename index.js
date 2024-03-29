const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
db.connect(function () {
  mainMenu();
});

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
    console.table(rows);
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
    console.table(rows);
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
    console.table(rows);
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
        type: "list",
        message: "Choose role for new Employee: ",
        name: "newRole",
        choices: ["Accounting", "Marketing", "Finance", "Human Resources"],
      },

      {
        type: "list",
        message: "Enter employee's manager: ",
        name: "newEmpManager",
        choices: ["Micheal", "Sarah", "Rene", "Samuel"],
      },
    ])
    .then((empAnswers) => {
      const addFirstName = empAnswers.firstName;
      const addLastName = empAnswers.lastName;
      let addEmpRole = 0;
      let addEmpManager = 0;

      switch (empAnswers.newRole) {
        case "Accounting":
          addEmpRole = 1;
          break;
        case "Marketing":
          addEmpRole = 2;
          break;
        case "Finance":
          addEmpRole = 3;
          break;
        case "Human Resources":
          addEmpRole = 4;
          break;
      }

      switch (empAnswers.newEmpManager) {
        case "Micheal":
          addEmpManager = 1;
          break;
        case "Sarah":
          addEmpManager = 2;
          break;
        case "Rene":
          addEmpManager = 3;
          break;
        case "Samuel":
          addEmpManager = 4;
          break;
      }

      const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES 
      (?,?,?,?)`;
      const input = [addFirstName, addLastName, addEmpRole, addEmpManager];
      db.query(sql, input, (err, row) => {
        if (err) {
          console.log("error");
          console.log("\n\n");
          mainMenu();
        } else {
          console.log(
            addFirstName +
              " " +
              addLastName +
              " " +
              addEmpRole +
              " " +
              addEmpManager +
              " was added"
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
  const sqlDisplay = "SELECT * FROM employees;";

  const statement = db.query(sqlDisplay, (err, row) => {
    console.table(row);
    if (err) {
      console.log("error");
      console.log("\n\n");
      // mainMenu();
    } else {
      console.log("\n\n");
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter Employee ID to update role: ",
          name: "empIDUpdate",
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
        // console.log(updateAnswers.empIDUpdate);
        // console.log(updateAnswers.empUpdateRole);
        // console.table(row);
        const idUpdate = updateAnswers.empIDUpdate;
        const updatedRole = updateAnswers.empUpdateRole;

        console.log(typeof idUpdate);
        console.log(typeof updatedRole);

        const sql = `UPDATE employees SET role_id = ${updatedRole} WHERE id = ${idUpdate} `;
        // let params = [idUpdate, updatedRole];
        // const displaySQL2 = `SELECT * FROM employees`;

        db.query(sql, (err, result) => {
          if (err) {
            console.log("error");
            console.log("\n\n");
            // mainMenu();
          } else {
            console.log("Employee role successfully updated!");

            employees();
          }
        });
      });
  });
  console.log(statement.sql);
  // prompts to choose emp & role

  // SQL to update database
}

// mainMenu();
// departments();
// roles();
// employees();
// addDepartment();
// addRole();
// addEmployee();
// addEmployeeRole();
