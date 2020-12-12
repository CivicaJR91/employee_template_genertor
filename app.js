const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output"); // directiory where the HTML file be created
const outputPath = path.join(OUTPUT_DIR, "team.html"); // HTML file name that will be created

const render = require("./lib/htmlRenderer"); // referencing htmlRender.js document
const { type } = require("os");// identify the operating system

let profile = []; // array that contains the information

//Start of Roles Prompt

const rolesQuestions = () => {
    //Choose a Role
    inquirer.prompt([
        {
            type: 'list',
            name: 'profile',
            message: 'Select the profile that you want to create:',
            choices: ["Engineer",
                "Intern",
                "Manager"]
        }
    ]).then(answers => {
        //After user select a profile, look at what type profile was selected 
        //Prompt the correct questions.
        //After user response to the questions push the data to the array "PROFILE"
        if (answers.profile === "Engineer") {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'engineername',
                    message: 'Enter Engineer Name',
                },

                {
                    type: 'input',
                    name: 'engineeremail',
                    message: 'Enter Engineer Email',
                },

                {
                    type: 'input',
                    name: 'engineereid',
                    message: 'Enter Engineer ID',
                },

                {
                    type: 'input',
                    name: 'engineergithub',
                    message: 'Enter Engineer GitHub Username',
                },
                {
                    type: 'list',
                    name: 'anotherprofile',
                    message: 'Would you like create another profile?',
                    choices: ["Yes", "No"]
                } // if user select Yes, prompt rolesQuestions

            ]).then(answers => {
                // after each answer create a new Engineer variable
                // push values into the profile array
                let engineer = new Engineer(answers.engineername, answers.engineeremail, answers.engineereid, answers.engineergithub);
                // console.log(engineer);
                profile.push(engineer);
                // console.log(profile);

                if (answers.anotherprofile === "Yes") {
                    rolesQuestions();
                }

                else {
                    const renderedHTML = render(profile) 
                    // calling the render variable and using "Profile" as parameter
                    //Profile is the array that contains the data
                    //This will be the same process to pass the profile data to the HTML file
                    fs.writeFile(outputPath, renderedHTML, (err) => {
                        if (err) console.log(err)
                        console.log('YOU WROTE SOME HTML INTO THE ' + outputPath + 'FOLDER!!!')
                    })
                }
            })

        }
        //Intern Profile Questions
        if (answers.profile === "Intern") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "internname",
                    message: "Enter Intern Name"
                },
                {
                    type: 'input',
                    name: 'internemail',
                    message: 'Enter Intern Email',
                },

                {
                    type: 'input',
                    name: 'internid',
                    message: 'Enter Intern Id',
                },

                {
                    type: 'input',
                    name: 'school',
                    message: 'Enter Intern School Name',
                },
                {
                    type: 'list',
                    name: 'anotherprofile',
                    message: 'Would you like create another profile?',
                    choices: ["Yes", "No"]
                }
            ]).then(answers => {
            
                let intern = new Intern(answers.internname, answers.internemail, answers.internid, answers.school);
                // console.log(intern);
                profile.push(intern);

                if (answers.anotherprofile === "Yes") {
                    rolesQuestions();
                }
                else {
                    const renderedHTML = render(profile)
                    fs.writeFile(outputPath, renderedHTML, (err) => {
                        if (err) console.log(err)
                        console.log('YOU WROTE SOME HTML INTO THE ' + outputPath + 'FOLDER!!!')
                    })
                }

            })
        }
        //Start Manager Questions
        if (answers.profile === "Manager") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "managername",
                    message: "enter manager name"
                },
                {
                    type: 'input',
                    name: 'manageremail',
                    message: 'Enter Email',
                },

                {
                    type: 'input',
                    name: 'managerid',
                    message: 'Enter id',
                },

                {
                    type: 'input',
                    name: 'phone',
                    message: 'Enter phone',
                },
                {
                    type: 'list',
                    name: 'anotherprofile',
                    message: 'Would you like create another profile?',
                    choices: ["Yes", "No"]
                }
               
            ]).then(answers => {
               
                let manager = new Manager(answers.managername, answers.managerid, answers.manageremail, answers.phone);
                // console.log(manager);
                profile.push(manager);

                if (answers.anotherprofile === "Yes") {
                    rolesQuestions();
                }

                else {
                    const renderedHTML = render(profile)
                    fs.writeFile(outputPath, renderedHTML, (err) => {
                        if (err) console.log(err)
                        console.log('YOU WROTE SOME HTML INTO THE ' + outputPath + 'FOLDER!!!')
                    })
                }
            })
        }

    })

}
rolesQuestions();


    
//HOMEWORK NOTES
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
