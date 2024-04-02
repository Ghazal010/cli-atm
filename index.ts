#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000;
let myPin = 1234;

let pin = await inquirer.prompt([{
    name: "atmpin",
    type: "number",
    message: "Please enter your pin"
}]);

if (pin.atmpin === myPin) {
    console.log(chalk.green.bold("PIN Accepted!"));

    let serviceOptions = await inquirer.prompt([{
        name: "Options",
        type: "list",
        message: "Kindly choose the service you wish to proceed with:",
        choices: ["Balance Inquiry", "Cash Withdrawal", "Fast Cash"]
    }]);

    if (serviceOptions.Options === "Cash Withdrawal") {
        let amount1 = await inquirer.prompt([{
            name: "amountWithdrawl",
            type: "number",
            message: "Please enter the amount you want to withdraw:"
        }]);

        let withdrawalAmount = amount1.amountWithdrawl;

        if (withdrawalAmount > myBalance) {
            console.log(chalk.bold.redBright("Insufficient balance!"));
        } else {
            myBalance -= withdrawalAmount;
            console.log(chalk.bold.underline.yellowBright(`Your remaining balance is: ${myBalance}`));
        }
    } else if (serviceOptions.Options === "Balance Inquiry") {
        console.log(chalk.bold.underline.blueBright(`Your Balance is ${myBalance}`));
    }

    if (serviceOptions.Options === "Fast Cash") {
        let amount1 = await inquirer.prompt([{
            name: "Fast",
            type: "list",
            message: "Please choose the amount you want to withdraw:",
            choices: ["1000", "2000", "5000"]
        }]);

        const fastCashAmount = amount1.Fast;
        if (fastCashAmount > myBalance) {
            console.log(chalk.bold.redBright("Insufficient balance!"));
        } else {
            myBalance -= fastCashAmount;
            console.log(chalk.bold.underline.magentaBright(`Your remaining balance is: ${myBalance}`));
        }
    }
} else {
    console.log(chalk.bold.bgRed("PIN Verification Failed.."));
}
