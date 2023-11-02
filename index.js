#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string'


let projectname = '';
let github_repo='';
let Lucide='';

async function askname() {
  return inquirer.prompt([{name: 'Project_name',type: 'confirm',message: 'Would you like to install and setup next.js ?'},
        {type:'confirm', name:'github', message:'Would you like to connect to Github repo?'}, 
        {type:'confirm', name:'lucide', message:'Would you like to setup Lucide react icons package?'},
        // {type:'input', name:'email', message:'E-mail (for password recovering):', when:function(answers){return answers.protect_ask}},
        // {type:'password', name:'password', message:'Password:', when:function(answers){return answers.protect_ask}},
        // {type:'password', name:'confirm_password', message:'Confirm you password:', when:function(answers){return answers.protect_ask}}
      ]).then(answer => {
    projectname = answer.Project_name;
    if(!projectname){
      process.exit(0)
    }
    github_repo=answer.github;
    Lucide=answer.Lucide;
  });
}



// inquirer.prompt([
//         {type:'input', name:'username', message:'Choose an username:'}, 
//         {type:'confirm', name:'protect_ask', message:'Do you want to password-protect your game list?'},
//         {type:'input', name:'email', message:'E-mail (for password recovering):', when:function(answers){return answers.protect_ask}},
//         {type:'password', name:'password', message:'Password:', when:function(answers){return answers.protect_ask}},
//         {type:'password', name:'confirm_password', message:'Confirm you password:', when:function(answers){return answers.protect_ask}}
//     ])



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
    console.log(gradient.pastel.multiline('Create Next.js app in ease. Initializing Next.js app with shadcn UI!!'));
    await askname();
    
    const success =await changeDirectoryAndCreateNextApp();
    await github_lucide_setup()
    if (success) {
      console.log('Directory changed, and Next.js app created successfully.');
    } else {
      console.error('Some commands failed.');
    }
  } catch (e) {
    console.error('An error occurred:', e);
  }

}

async function github_lucide_setup(){

    if (github_repo && Lucide) {
      console.log(gradient.pastel.multiline('Initializing setup of Github!!'));
        return inquirer.prompt([{name: 'github',type: 'input',message: 'Give your repo link..'}])
        .then((answer)=>{
          github_repo=answer.github
          execSync(`npm install lucide-react && git add . && git commit -m "first commit" && git branch -M main && git remote add origin ${github_repo} && git push --set-upstream origin main && code .`, { stdio: 'inherit' });
        })
    }
    else if(github_repo){
      return inquirer.prompt([{name: 'github',type: 'input',message: 'Give your repo link..'}])
      .then((answer)=>{
        github_repo=answer.github
        execSync(`git add . && git commit -m "first commit" && git branch -M main && git remote add origin ${github_repo} && git push --set-upstream origin main && code .`, { stdio: 'inherit' });
      })
    }
}

async function changeDirectoryAndCreateNextApp() {
  try {
    // Change the directory to "nnn" and then run the "npx create-next-app" command.
    execSync(`npx create-next-app@latest . && npx shadcn-ui@latest init`, { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.error('Failed to change directory and create Next.js app:', e);
    return false;
  }
}



main();





