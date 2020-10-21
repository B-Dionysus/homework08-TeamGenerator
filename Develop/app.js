const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

let employeeArray=[];

// Inquirer prompts for the manager
function askAboutManager(){
    inquirer.prompt(
        [{
            message:"Manager Name:",
            name:"name",
            type:'input',
        },
        {
            message:"Manager Office Number:",
            name:"number",
            type:'input',
            validate:num=>isNaN(parseInt(num)) ? "Please enter a number" : true,
        },
        {
            message:"Manager Email:",
            name:"email",
            type:'input',
            validate:email=>email.indexOf("@")===-1 ? "Please enter a valid email" : true,
        }]) 
        .then(answers=>{
            employeeArray.push(new Manager(answers.name, employeeArray.length, answers.email, answers.number));
            mainDirectory();
    });
}
// Inquirer prompts for the engineers
function askAboutEngineer(){
    inquirer.prompt(
        [{
            message:"Engineer Name:",
            name:"name",
            type:'input',
        },
        {
            message:"Engineer Github UserName:",
            name:"github",
            type:'input',
        },
        {
            message:"Engineer Email:",
            name:"email",
            type:'input',
            validate:email=>email.indexOf("@")===-1 ? "Please enter a valid email" : true,
        }]) 
        .then(answers=>{
            employeeArray.push(new Engineer(answers.name, employeeArray.length, answers.email, answers.github));
            mainDirectory();
    });
}
// Inquirer prompts for the interns
function askAboutIntern(){
    inquirer.prompt(
        [{
            message:"Intern Name:",
            name:"name",
            type:'input',
        },
        {
            message:"What school are they attending:",
            name:"school",
            type:'input',
        },
        {
            message:"Intern Email:",
            name:"email",
            type:'input',
            validate:email=>email.indexOf("@")===-1 ? "Please enter a valid email" : true,
        }]) 
        .then(answers=>{
            employeeArray.push(new Intern(answers.name, employeeArray.length, answers.email, answers.school));
            mainDirectory();
    });
}

// Initial question menu
function mainDirectory(){
    // Options is an arry of possible rols that w can fill
    let options=[];
    options.push("Add an engineer");
    options.push("Add an intern");    
    // We can only have one manager on this team, so we need to check to see if
    // we've already asked about that info.
    let weHaveAManagerAlready=false;
    for(emp of employeeArray) if(emp.getRole()==="Manager") weHaveAManagerAlready=true;

    // If we already have a manager, then we give the user the option to finish
    // This does allow the user to declare a team with one manager and no engineers or interns
    // but the spec said "any number" of engineers and interns. And someone's got to hire those
    // positions, after all. Maybe this is a brand new team!
    if(weHaveAManagerAlready) options.push("Finished");
    // If we don't have a manager yet, however, we do not let the user end, and we give them the option to add one
    // unshit() puts it option at the top of the list.
    else  options.unshift("Add a manager");

    inquirer.prompt([{
        message:"Add an employee:",
        name:"role",
        type:"list",
        choices:options
    }])
    .then(answers=>{
        switch(answers.role){
            case "Add a manager":{
                askAboutManager();
                break;
            }
            case "Add an engineer":{
                askAboutEngineer();
                break;
            }
            case "Add an intern":{
                askAboutIntern();
                break;
            }
            case "Finished":{
                writeFile(employeeArray);
                break;
            }
        }
    });
}




function init(){
    mainDirectory();
}
function writeFile(arr){
    let html=render(arr);
    fs.writeFile("./output/team.html",html,error=>error ? console.log(error) : console.log("Success"));
}



init();