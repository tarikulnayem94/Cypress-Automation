NPF Automation Testing Strategy Report


🔧  NPF Automation Page Object Model (POM)
To ensure scalability and maintainability in automating the system, we are implementing a robust test automation framework using the Page Object Model (POM) design pattern. This approach helps isolate page selectors and business logic, promoting reusability, reducing code duplication, and simplifying future updates across the system.

cypress/
├── downloads/
├── e2e/
│     ├── Global_Admin.cy.js
│     ├── Site_Admin.cy.js
│     ├──  npfTestSuite.cy.js 
│     └── - - - - - 
├── pages/
│     ├── loginPage.js
│     ├── dashboardPage.js
│     ├── contentPage.js
│     └── - - - - - 
├── pageObjects/
│     ├── BannerActions.js
│     ├── NewsActions.js
│     ├── PageActions.js 
├── fixtures/
│     ├── files
│     └──  - - - - - 
└── support/
│     ├── commands.js
│     └── e2e.js
│     └── - - - - - -
Cypress.config.js
Package.json




 🎯  Environment Setup For Cypress

Prerequisites: Before installing Cypress, ensure you have the following installed:
Node.js (preferably LTS version) - Download and install.


A code editor like - Visual Studio Code

Step 1: Open CMD/Terminal, then execute below command

 npm -i  init           —> create package.json file
 
Step 3: Install Cypress

Npm install cypress - -save -dev

Step 3: Start Cypress

npx cypress open - Cypress open (headed)

npx cypress run - run test cases (headless)

npx cypress run - -headed - -spec cypress\e2e\Global_Admin.cy.js --browser chrome  (for Specific file & specific browser).



 📝 Generate HTML Report
 
 
Mochawesome Report Generation Steps:

Step 1: Install the plugin below

npm i --save-dev cypress-mochawesome-reporter

Step 2: Add the following lines of code in the cypress.config.js file

reporter: 'cypress-mochawesome-reporter',

require('cypress-mochawesome-reporter/plugin')(on);

Step 3: Add the below line in the e2e.js file

import 'cypress-mochawesome-reporter/register';

Step 4: Create & Run test

 verify reports → html → index.html
 

