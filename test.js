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
      console.log(choice);
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
        case "Quit Program":
          console.log("Bye now!");
          process.exit(0);
          break;
        default:
          console.log("Wrong input. Try again");
      }
    });
}

mainMenu();
