const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: 'https://backoffice.a2i.gov.bd', chromeWebSecurity: false,

    viewportWidth: 1920,
    viewportHeight: 1080,

  },
});


// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
//   reporterOptions: {
//     reportDir: 'cypress/reports',
//     overwrite: false,
//     html: true,
//     json: true
//   }
// });


// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
//   reporterOptions: {
//     reportPageTitle: 'Custom Report Title',
//     charts: true,
//     embeddedScreenshots: true,
//     inlineAssets: true,
//   },
//   e2e: {
//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on);
//     }
//   }
// });

