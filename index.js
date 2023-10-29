#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string'


let projectname = '';

async function askname() {
  return inquirer.prompt({
    name: 'Project_name',
    type: 'input',
    message: 'Would you like to install and setup next.js? (y/n)',
  }).then(answer => {
    projectname = answer.Project_name;
  });
}




const fontOptions = {
  font: 'ANSI Shadow',
  horizontalLayout: 'fitted', 
  verticalLayout: 'fitted', 
  width: 150, 
  whitespaceBreak: true, 
};


function intro() {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log(' ')
    console.log(' ')
    console.log(' ')
    const intromsg = 'Next.js Buddy';
    figlet(intromsg,fontOptions, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(gradient.pastel.multiline(data));
        resolve();
      }
    });
  });
}

async function main() {
  try {
    await intro();
    console.log(gradient.pastel.multiline('Create Next.js app in ease. Initializing Next.js app with Schnadcn UI!!'));
    await askname();
    const success =await changeDirectoryAndCreateNextApp();
    if (success) {
      console.log('Directory changed, and Next.js app created successfully.');
    } else {
      console.error('Some commands failed.');
    }
  } catch (e) {
    console.error('An error occurred:', e);
  }

}

async function changeDirectoryAndCreateNextApp() {
  try {
    // Change the directory to "nnn" and then run the "npx create-next-app" command.
    execSync(`npx create-next-app@latest . && npx shadcn-ui@latest init && code .`, { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.error('Failed to change directory and create Next.js app:', e);
    return false;
  }
}



main();





