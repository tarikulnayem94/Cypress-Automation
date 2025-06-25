describe('npf.a2i.gov.bd', () => {
    // Shared login function with session management
    const login = () => {
        cy.session('TC - 1 a2i-login ', () => {
            // cy.visit('https://backoffice.a2i.gov.bd');
            cy.visit('https://backoffice.a2i.gov.bd/');

            cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-global/protocol/openid-connect/auth');
            // cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/protocol/openid-connect/auth');
            // Fill login credentials
            cy.get('input[name="username"]').type('hasanbd666@gmail.com');
            // cy.wait(2000);
            cy.get('input[name="password"]').type('password');
            // cy.wait(2000);
            cy.get('button[type="submit"]').click();
            // cy.wait(4000);
            cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-global/login-actions/authenticate');
            // cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/login-actions/authenticate');
            cy.get('input[name="code"]').type('123456');
            cy.get('.pf-v5-c-button').click();
            // cy.wait(4000);
            cy.get('span.MuiTypography-body1.nav-item-text').contains('কনটেন্ট').click();
            cy.get('input[type="text"][role="combobox"][aria-expanded="false"]').click();
            cy.contains('li', 'Ministry Cluster (BN)').click();
            cy.get('.MuiGrid-grid-xs-6 > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
            cy.contains('পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়').click();

            cy.get('.css-1rj6x3l > .MuiBox-root').click();
            cy.wait(4000);
        });
    };


    beforeEach(() => {
        login();
        cy.visit('https://backoffice.a2i.gov.bd/contents');
        // cy.visit('https://backoffice.a2i.gov.bd');
        // cy.visit('https://frontend-npf-dev.softbd.xyz');
    });


    it('(TC - 1) 🅻🅾🅶🅸🅽 check at the start of the test script since all subsequent functionality depends on an authenticated session.', () => {
        cy.visit('https://backoffice.a2i.gov.bd/contents');
    });



    it('(TC - 2)  User count from dashboard', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)')
            .invoke('text')
            .then((ap) => {
                cy.log('Site Admin' + ap);
                console.log('Site Admin' + ap);
            });
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)')
            .invoke('text')
            .then((sa) => {
                cy.log('Site Admin ' + sa);            // Logs in Cypress UI
                console.log('Site Admin ' + sa);       // Logs in browser console
            });
    });



    it('(TC - 3)  Choose ministry cluster', () => {
        cy.visit('https://backoffice.a2i.gov.bd/contents');

        cy.get('input[type="text"][role="combobox"][aria-expanded="false"]').click();
        // cy.wait(3000);
        cy.contains('li', 'Ministry Cluster (BN)').click();
        // cy.wait(4000);
        cy.get('.MuiGrid-grid-xs-6 > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
        cy.contains('পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়').click();
        // cy.wait(4000);
        cy.get('.css-1rj6x3l > .MuiBox-root').click();
        // cy.wait(4000);
        cy.visit('https://backoffice.a2i.gov.bd');
    });



    it('(TC - 4)  Choose ministry cluster and preview theme', () => {
        cy.visit('https://backoffice.a2i.gov.bd');
        cy.wait(2000);
        cy.get('[href="https://backoffice.a2i.gov.bd/site-settings"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.wait(2000);
        cy.get('[href="https://backoffice.a2i.gov.bd/site-themes"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.wait(2000);
        cy.get('[href="/site-themes/6655ccb43f976f6678ad9248/theme-preview/demo-moef.a2i.gov.bd"] > .MuiButtonBase-root').click();
        cy.wait(5000);
    });



    it('(TC - 5)  Check Profile data', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('.profileMenu-userName').first().click();
        cy.get('.css-1sucic7 > .MuiPaper-root > .MuiList-root > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();

        // Get the email element and print it
        cy.get(':nth-child(3) > .personal-info-parent-box > .personal-info-content-text')
            .invoke('text')
            .then((email) => {
                cy.log('Email is: ' + email);            // Logs in Cypress UI
                console.log('Email is: ' + email);       // Logs in browser console
            });
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
    });



    it('(TC - 5)  Update Profile data', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('.profileMenu-userName').first().click();
        cy.get('.css-1sucic7 > .MuiPaper-root > .MuiList-root > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();

        cy.get('.MuiButton-contained').click();
        cy.get('input[type="file"]').invoke('show').selectFile('cypress/fixtures/images (2).png');
        cy.get('.css-im29bd > .MuiButtonBase-root').click();
    });




    it('(TC - 6)  Sign out Profile', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('.profileMenu-userName').first().click();
        cy.get(':nth-child(3) > .MuiListItemText-root > .MuiTypography-root')
            .invoke('text')
            .then((email) => {
                cy.log('Button Title: ' + email);            // Logs in Cypress UI
                console.log('Button Title: ' + email);       // Logs in browser console
            });
        cy.get(':nth-child(3) > .MuiListItemText-root > .MuiTypography-root').click();
    });




    it('(TC - 7)  give content permission for ministry', () => {

        cy.get('[href="https://backoffice.a2i.gov.bd/default-contents"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.wait(1000);

        // cy.get('[href="https://backoffice.a2i.gov.bd/default-contents"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
        // cy.get(':nth-child(3) > :nth-child(3) > .MuiButtonGroup-root > .MuiButtonBase-root').click();
        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("অফিস");
        cy.wait(2000);

        cy.get(':nth-child(1) > :nth-child(5) > .MuiButtonGroup-root > .MuiButtonBase-root').click();
        cy.wait(2000);
        cy.get('.css-rfnosa > .MuiButtonBase-root').click();
        cy.get(':nth-child(1) > .css-82tqux > :nth-child(1) > .css-tncf9p > .css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়");
        cy.wait(2000);
        // cy.get('svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-vubbuv').click(), { multiple: true };
        // cy.get('svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-vubbuv').first().click();
        // cy.get('svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-vubbuv').eq(2).click(); // Index starts at 0
        // cy.get('input[data-indeterminate="false"]').click(), { multiple: true };

        cy.get('input.PrivateSwitchBase-input.css-1m9pwf3').check({ force: true });
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.wait(2000);
    });



    it('(TC - 8)  🅲🆁🅴🅰🆃🅴 - a new user', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root').click();
        cy.get('.MuiStack-root > .MuiButtonBase-root').click();

        cy.get('#mui-component-select-user_type_code').click();
        cy.get('[data-value="2"]').click();
        cy.wait(1000);
        cy.get(':nth-child(2) > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
        cy.contains('li', 'Assistant Programmer').click();
        cy.get(':nth-child(3) > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
        cy.contains('li', 'Ministry Cluster (BN)').click();
        cy.get(':nth-child(4) > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click()
        cy.contains('li', 'পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়').click();

        cy.get('input[name="email"]').type("qa365434565455@gmail.com");
        cy.get('input[name="mobile"]').type("01832201010");

        cy.get('input[name="full_name_bn"]').type("QA ENGG BN");
        cy.get('input[name="full_name_en"]').type("QA ENGG EN");

        cy.get('input[name="password"]').type("Npf@12345");
        cy.get('input[name="confirm_password"]').type("Npf@12345");

        cy.get(':nth-child(9) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get(':nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();

        cy.get('input[name="designation_bn"]').type("QA ENGG bN");
        cy.get('input[name="designation_en"]').type("QA ENGG eN");

        cy.get(':nth-child(14) > .MuiFormControl-root > .MuiFormLabel-root')  // Escape colon with backslashes
            .selectFile('cypress/fixtures/images11.png', { force: true });

        cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiButton-contained').click();
        cy.wait(2000);
    });



    it('(TC - 9)   🅲🆁🅴🅰🆃🅴 - a new domain - ', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/domains"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.contains('button', 'নতুন ডোমেইন').click();

        cy.get(':nth-child(1) > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.contains('li', 'Ministry Cluster (BN)').click();

        cy.get(':nth-child(2) > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.contains('li', 'পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়').click();

        cy.get('input[name="subdomain"]').type("testdomain420.npf");

        cy.get('.MuiFormGroup-root > :nth-child(2)').click();
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.wait(2000);
        cy.reload();

        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("testdomain420.npf");
        cy.get(':nth-child(1) > :nth-child(6) > .MuiButtonGroup-root > [aria-label="মুছুন"]').click();
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.wait(2000);
    });




    it('(TC - 10)  🅲🆁🅴🅰🆃🅴 - a new office  - -', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/offices"] > .MuiListItem-root > .MuiButtonBase-root').click();
        cy.contains('button', 'নতুন অফিস').click();

        cy.get('input[name="title_bn"]').type("নতুন অফিস in bangla");
        cy.get('input[name="title_en"]').type("new office in english");

        cy.get('input[name="subdomain"]').type("npf.test.qa");

        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.contains('li', 'ministry (BN)').click();

        cy.get('#mui-component-select-office_level_id').click();
        // Select an option from the list (e.g., "District")
        cy.get('li').contains('Ministry').click();

        // cy.get('input[name="welcome_text_en"]').type("অভ্যর্থনা টেক্সট (বাংলা)");
        cy.get(':nth-child(7) > .css-tzsjye > .MuiFormControl-root > .MuiInputBase-root').type("অভ্যর্থনা টেক্সট (বাংলা)");
        // cy.get('input[name="welcome_text_en"]').type("অভ্যর্থনা টেক্সট (ইংরেজি)");
        cy.get(':nth-child(8) > .css-tzsjye > .MuiFormControl-root > .MuiInputBase-root').type("অভ্যর্থনা টেক্সট (ইংরেজি)");

        // Fill in content in the rich text editor (Bengali)
        cy.get('div.ck-content')
            .first()
            .realClick()
            .realType('Bengali: This is the body of the document.{enter}{enter}')
            .realType('Bengali: This is a new paragraph below.');

        // Fill in content in the rich text editor (English)  
        cy.get('div.ck-content')
            .eq(1)
            .realClick()
            .realType('English: This is the body of the document.{enter}{enter}')
            .realType('English: This is a new paragraph below.');

        cy.get('input[type="file"][accept="image/*"]').first()
            .selectFile('cypress//fixtures//images11.png', { force: true });

        cy.get('input[name="facebook_app_id"]').type("https://www.facebook.com/sqa.test");

        cy.get('input[name="office_heading_bn"]').type("new office for NPF(SBD) bn");
        cy.get('input[name="office_heading_en"]').type("new office for NPF(SBD) en");

        cy.get('input[name="office_slogan_bn"]').type("Office Slogan (Bn) in bangla");
        cy.get('input[name="office_slogan_en"]').type("Office Slogan (En) in english");

        cy.get('input[type="file"][accept="image/*"]').eq(1)
            .selectFile('cypress//fixtures//sag.png', { force: true });

        cy.get('input[name="support_image_action_link"]').type("https://softbdltd.com/wp-content/uploads/2025/04/1720732921510.jpeg");
        cy.get('input[name="planing_implementation_heading"]').type("planing_implementation_heading");

        cy.get('input[name="office_address"]').type("Dhaka-sbd");
        cy.get('input[name="office_contact"]').type("01701046982");

        cy.get(':nth-child(22) > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.contains('li', 'ইংরেজি').click();

        cy.get('.MuiFormGroup-root > :nth-child(2)').click();
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.wait(2000);
    });



    it('(TC - 11)  🅲🆁🅴🅰🆃🅴 - a new role', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/roles"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.contains('button', 'নতুন রোল').click();
        cy.get('input[name="title"]').type("নতুন TEST রোল");
        cy.get('input[name="key"]').type("ROLE WITH TEST");

        cy.get('#mui-component-select-allow_user_types').click();
        cy.contains('li', 'অফিস ব্যবহারকারী').click();
        cy.wait(1000);
        cy.get('body').click(0, 0);
        cy.get('input[name="description"]').type("Office Test Role");

        cy.get('.css-1xa7wbs > .MuiFormControlLabel-root').click();
        cy.get('.MuiFormGroup-root > :nth-child(2)').click();
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    });




    it('(TC - 12)  Give permission of new role', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/roles"] > .MuiListItem-root > .MuiButtonBase-root').click();
        cy.wait(5000);
        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("নতুন TEST রোল");
        cy.wait(5000);

        cy.get('button').contains('Permission').click(), { force: true };
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root > label > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > :nth-child(4) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > :nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get(':nth-child(6) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root > label > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get(':nth-child(4) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root > label > .MuiButtonBase-root > .PrivateSwitchBase-input').click();

        cy.get('.MuiButton-contained').click();
        cy.wait(1000);

        cy.get('.MuiButton-outlined').click();
        cy.wait(1000);
    });




    it('(TC - 13)  Make a new icon', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/icons"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
        cy.get('input[name="title_bn"]').eq(0).type("নতুন আইকন");
        cy.get('input[name="title_en"]').eq(0).type("New Icon");

        cy.get('.MuiGrid-grid-xs-4 > .MuiButtonBase-root').click();

        cy.get('input[name="title_en"]').eq(1).type('নতুন আইকন ক্যাটাগরি');
        cy.get('input[name="title_bn"]').eq(1).type("New Icon Category");
        cy.get('.MuiPaper-root > form > .MuiDialogActions-root > .MuiButton-contained').click();

        cy.get('.MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
        cy.contains('li', 'New Icon Category').click();

        // Upload image file
        cy.get('input[type="file"][accept="image/*"]')
            .selectFile('cypress//fixtures//PEOPLE (6).png', { force: true });

        cy.get('.MuiFormControlLabel-root > .MuiSwitch-root').click();
        cy.wait(1000);

        cy.get('.MuiDialogActions-root > :nth-child(2)').click();
        cy.wait(1000);
    });





    it('(TC - 14)  Set office Static & Dynamic content types', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.wait(1000);
        cy.get('[href="https://backoffice.a2i.gov.bd/office-content-type"] > .MuiListItem-root > .MuiButtonBase-root').click();
        cy.wait(1000);
        // cy.get(':nth-child(3) > .MuiGrid-root > .css-1dqpc7h > :nth-child(1) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        // cy.get(':nth-child(3) > .MuiGrid-root > .css-1dqpc7h > :nth-child(1) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        // cy.get(':nth-child(5) > .MuiGrid-root > .css-1dqpc7h > :nth-child(15) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        // cy.get(':nth-child(5) > .MuiGrid-root > .css-1dqpc7h > :nth-child(15) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.wait(1000);
        cy.get(':nth-child(73) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        // cy.get('.css-1j8p81r > .MuiButtonBase-root').click({ force: true });
        cy.wait(1000);
        // cy.get('button[type="submit"]').contains('সংরক্ষণ')
        cy.get('.css-v08z5u > .MuiBox-root > .MuiButtonBase-root').click({ force: true });
        cy.wait(1000);
    });





    it('(TC - 15)  Set office Taxonomy types', () => {
        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/office-taxonomy-type"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.get(':nth-child(82) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get(':nth-child(82) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.css-v08z5u > .MuiBox-root > .MuiButtonBase-root').click();
    });





    it('(TC - 16)  Make a new texonomy type', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');
        cy.get('[href="https://backoffice.a2i.gov.bd/contents"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/taxonomy-types"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
        cy.get('input[name="name"]').eq(0).type("new420-tteesstt");

        cy.get('input[name="title_bn"]').eq(0).type("New Taxonomy Title (Bn)");
        cy.get('input[name="title_en"]').eq(0).type("New Taxonomy Title (En)");
        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type("সেবার ধরণ");
        cy.contains('li', 'সেবার ধরণ', { timeout: 10000 }).click();

        cy.get('.MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiFormControlLabel-root > .MuiSwitch-root').click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    });




    it('(TC - 15)  Assign cluster and minitry in the texonomy type', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/contents"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/taxonomy-types"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();

        cy.get(':nth-child(1) > :nth-child(7) > .MuiButtonGroup-root > [aria-label="পরিচালনা"]').click();
        cy.get('label > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiPaper-root > .MuiGrid-root > .MuiButtonBase-root').click();

        cy.get('.css-rfnosa > .MuiButtonBase-root').click();
        // cy.get('.MuiFormControlLabel-root > .MuiTypography-root').click();
        cy.get(':nth-child(1) > .MuiGrid-container > :nth-child(1) > .css-tncf9p > .css-4zmibr > .MuiInputBase-root > .MuiInputBase-input')
            .type('পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়');
        cy.wait(4000);

        cy.get('.MuiTableBody-root .MuiTableRow-root')
            .contains('পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়')                      // ensures the correct row
            .parents('tr')                      // goes to the full row
            .find('input[type="checkbox"]')
            .check({ force: true });

        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
        cy.wait(1000);
        cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
    });




    it('(TC - 17)  🅲🆁🅴🅰🆃🅴 - a new texonomy', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/contents"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/taxonomy"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();

        cy.get('input[name="title_bn"]').eq(0).type("New Taxonomy (Bn)");
        cy.get('input[name="title_en"]').eq(0).type("New Taxonomy (En)");

        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type("Test Cat");
        cy.contains('li', 'Test Cat', { timeout: 10000 }).click();

        cy.get('input[name="sort_order"]').type("44")
        cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();
        cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
    });




    it('(TC - 19)  Assign ministry and cluster to content type', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/contents"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/content-types"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('reports');
        cy.wait(4000);

        cy.get(':nth-child(2) > :nth-child(7) > .MuiButtonGroup-root > [aria-label="পরিচালনা"]').click({ multiple: true });
        cy.get('label > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiPaper-root > .MuiGrid-root > .MuiButtonBase-root').click();
        cy.get('.css-rfnosa > .MuiButtonBase-root').click();

        cy.wait(1000);
        // cy.get('.MuiFormControlLabel-root').click();
        // cy.get(':nth-child(2) > .MuiGrid-container > :nth-child(1) > .css-tncf9p > .css-4zmibr > .MuiInputBase-root > .MuiInputBase-input')
        //     .type("পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়");
        // cy.wait(1000);

        cy.get('.MuiTableBody-root .MuiTableRow-root')
            .contains('যুব ও ক্রীড়া মন্ত্রণালয়')                      // ensures the correct row
            .parents('tr')                      // goes to the full row
            .find('input[type="checkbox"]')
            .check({ force: true });
        cy.wait(2000);

        cy.get('.MuiDialogActions-root > .MuiButton-contained').click(), { multiple: true };
        cy.wait(2000);
        cy.get('.MuiTypography-root > .MuiButtonBase-root').click(), { multiple: true };
    });







    it('(TC - 18)  🅲🆁🅴🅰🆃🅴 - content type', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/contents"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/content-types"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
        cy.get('input[name="slug"]').type("tteesstt-content");
        cy.get('input[name="title_bn"]').type("New content (Bn)");
        cy.get('input[name="title_en"]').type("New content (En)");

        cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("acorn");
        cy.wait(2000);
        cy.get('.content-item-icon-container').click();

        cy.get(':nth-child(6) > .MuiFormControl-root > .css-1xa7wbs > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiGrid-spacing-xs-3 > :nth-child(8) > .MuiFormControl-root > .css-1xa7wbs > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.css-12f5k > .MuiButtonBase-root').click(), { multiple: true };

        cy.get('input[name="fields[1].id"]').type("QA CONTENT ID");
        cy.wait(1000);

        // cy.get('input[name="fields[1].title_bn"]').type("QA Content title BN", { force: true });
        cy.get('input[name="fields[1].title_en"]').type("QA Content title EN", { force: true });
        // cy.get('input[role="combobox"]').first().click();

        // cy.get('input[role="combobox"]').first()
        //     .should('exist')
        //     .should('be.visible')
        //     .type("text");

        // cy.get(':nth-child(2) > .css-1jw6nj6 > :nth-child(7) > .MuiFormControl-root > .css-1xa7wbs > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get(':nth-child(2) > .css-1jw6nj6 > :nth-child(8) > .MuiFormControl-root > .css-1xa7wbs > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiFormGroup-root > :nth-child(2)').click(), { multiple: true }, { force: true };
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    });




    it('(TC - 20)  🅲🆁🅴🅰🆃🅴 - a new menu', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/contents"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/menus"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.get('input[name="title_en"]').type("New QA Menu (Bn)");
        cy.get('input[name="title_bn"]').type("New QA Menu (En)");

        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.contains('li', "বহিরাগত").click();
        cy.get('input[name="link_path"]').type("https://www.lipsum.com/");
        cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();

        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("acorn");
        cy.wait(2000);
        cy.get('.content-item-icon-container').click();
        cy.get('.MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiButton-contained').click();
    });





    it('(TC - 21)  Change cluster and ministry', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('.css-1ginofd > .MuiButtonBase-root').click();
        cy.get('.MuiButton-containedWarning').click();

        cy.get('input[type="text"][role="combobox"][aria-expanded="false"]').click();
        cy.contains('li', 'Ministry Cluster (BN)').click();
        cy.wait(2000);

        cy.get('.MuiGrid-grid-xs-6 > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
        cy.wait(1000);
        cy.contains('li', 'যুব ও ক্রীড়া মন্ত্রণালয়').click();
        cy.wait(1000);
        cy.get('.css-1rj6x3l > .MuiBox-root').click();
    });




    it('(TC - 22)  Change Site setting data', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/site-settings"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.wait(1000);

        cy.get('input[name="document_file_size"]').clear().type("24");
        cy.get('input[name="image_file_size"]').clear().type("6");

        cy.get('#mui-component-select-content_type_officer_taxonomy_type').click();
        cy.contains('li', 'Officer Wing').click();
        cy.wait(1000);
        cy.get('.css-1690nn9 > .MuiButtonBase-root').click();
    });




    it('(TC - 23) & (TC - 28)    Domain (Render) preview & Language changes', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('.css-15zum9u > :nth-child(1) > .MuiBox-root').click();
        cy.get('.MuiButtonBase-root > .material-icons').click();

        // cy.get('[title="View Website: moef.npf.test"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[title="View Website: demo-moef.a2i.gov.bd"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();

        // cy.get('[title="View Website: moef.npf.test"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root')
        //     .invoke('removeAttr', 'target')
        //     .click();
    });




    it('(TC - 26)  search and View Users logs data', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get(':nth-child(3) > a > .css-12cqcxs > .css-1mph809 > .SummaryBox-body').click();
        // cy.get('p.SummaryBox-body').contains('View').eq(0).click();
        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("mokbuldev@yopmail.com");
        cy.wait(2000);
        cy.get(':nth-child(1) > :nth-child(8) > .MuiButtonGroup-root > .MuiButtonBase-root').click();
        cy.wait(2000);
        cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
        cy.wait(2000);
        cy.get('.css-4zmibr > .MuiButtonBase-root').click();
        cy.reload();
    });





    it(' (TC - 26) -  Search and view users logs data and print ("Extracts IP", "Windows Version", and "Browser")', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');
        cy.get(':nth-child(3) > a > .css-12cqcxs > .css-1mph809 > .SummaryBox-body').click();
        // cy.get('p.SummaryBox-body').contains('View').eq(0).click();
        cy.get('input[type="text"][role="combobox"][aria-expanded="false"]').click();
        cy.contains('li', 'Ministry Cluster (BN)').click();
        cy.wait(1000);
        cy.get('.MuiGrid-grid-xs-6 > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
        cy.contains('পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়').click();
        cy.wait(1000);
        cy.get('.css-1rj6x3l > .MuiBox-root').click();
        cy.wait(1000);

        // cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("mokbuldev@yopmail.com");
        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("hasanbd666@gmail.com");

        cy.wait(2000);
        cy.get(':nth-child(1) > :nth-child(8) > .MuiButtonGroup-root > .MuiButtonBase-root').click();
        cy.wait(2000);

        // Example: Getting inner text of some elements

        cy.get(':nth-child(10) > :nth-child(2)').then(($el) => {
            cy.log('IP Address:', $el.text());
        });

        cy.get(':nth-child(17) > :nth-child(2)').then(($el) => {
            cy.log('OS:', $el.text());
        });

        cy.get(':nth-child(18) > :nth-child(2)').then(($el) => {
            cy.log('OS VERSION:', $el.text());
        });

        cy.get(':nth-child(20) > :nth-child(2)').then(($el) => {
            cy.log('Browser:', $el.text());
        });

        cy.get(':nth-child(21) > :nth-child(2)').then(($el) => {
            cy.log('Browser VERSION:', $el.text());
        });
        
    });




    it('(TC - 25)  search and View Audit logs data', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');
        cy.get(':nth-child(2) > a > .css-12cqcxs > .css-1mph809 > .SummaryBox-body').click();
        cy.wait(3000);
        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("Users");
        cy.wait(2000);
        cy.get(':nth-child(1) > :nth-child(9) > .MuiButtonGroup-root > .MuiButtonBase-root').click();
        cy.wait(2000);
        cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
        cy.wait(2000);
        cy.get('.css-4zmibr > .MuiButtonBase-root').click();
        // cy.reload();
    });




    it('(TC - 32)  🅲🆁🅴🅰🆃🅴 - a new video tutorial', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/site-settings"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.wait(1000);
        cy.get('[href="https://backoffice.a2i.gov.bd/video-tutorial"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();

        cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();

        cy.get('input[name="title_bn"]').type("Tutorial Title (Bn)");
        cy.get('input[name="title_en"]').type("Tutorial Title (En)");

        cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
        cy.contains('li', 'পাতা').click();
        cy.get('input[name="tutorial_link"]').type("https://www.youtube.com/watch?v=jGVRAK8KIBg");

        cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get('[data-timestamp="1748973600000"]').click();

        cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get('.MuiIconButton-edgeStart').click();
        cy.get('[data-timestamp="1752688800000"]').click(), { multiple: true };

        cy.get(':nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();
        cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').click({ force: true });
    });



    it(' (TC - 30)  User count from dashboard', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)')
            .invoke('text')
            .then((ap) => {
                cy.log('Site Admin' + ap);
                console.log('Site Admin' + ap);
            });
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)')
            .invoke('text')
            .then((sa) => {
                cy.log('Site Admin ' + sa);            // Logs in Cypress UI
                console.log('Site Admin ' + sa);       // Logs in browser console
            });
    });




    it('(TC - 32)  Assign cluster and minitry to the default content', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/contents"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/default-contents"] > .MuiListItem-root > .MuiButtonBase-root').click();

        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("অফিস");
        cy.wait(5000);
        cy.get(':nth-child(1) > :nth-child(5) > .MuiButtonGroup-root > .MuiButtonBase-root').click();

        cy.get('label > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
        cy.get('.MuiPaper-root > .MuiGrid-root > .MuiButtonBase-root').click();

        cy.get('.css-rfnosa > .MuiButtonBase-root').click();
        // cy.get('.MuiFormControlLabel-root > .MuiTypography-root').click();
        cy.get(':nth-child(1) > .MuiGrid-container > :nth-child(1) > .css-tncf9p > .css-4zmibr > .MuiInputBase-root > .MuiInputBase-input')
            .type("যুব ও ক্রীড়া মন্ত্রণালয়");
        cy.wait(3000);

        cy.get('.MuiTableBody-root .MuiTableRow-root')
            .contains('যুব ও ক্রীড়া মন্ত্রণালয়')                      // ensures the correct row
            .parents('tr')                      // goes to the full row
            .find('input[type="checkbox"]')
            .check({ force: true });
        cy.wait(2000);
        cy.get('.MuiDialogActions-root > .MuiButton-contained').click(), { multiple: true };
        cy.wait(3000);
        cy.get('.MuiTypography-root > .MuiButtonBase-root').click(), { multiple: true };
        cy.get('.MuiTypography-root > .MuiButtonBase-root').click(), { multiple: true };
    });




    it('(TC - 27)  User password reset for Site Admin', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/users"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)')
        cy.get(':nth-child(6) > :nth-child(9) > .MuiButtonGroup-root > [aria-label="পাসওয়ার্ড আপডেট করুন"]').click();

        cy.get('input[name="new_password"]').type("Npf@123456");
        cy.get('input[name="confirm_password"]').type("Npf@123456");

        cy.get(':nth-child(1) > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get(':nth-child(2) > .MuiGrid-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get('.MuiButton-contained').click();
    });



    it('(TC - 34) view setting for a content and preview', () => {
        cy.visit('https://backoffice.a2i.gov.bd/');

        cy.get('[href="https://backoffice.a2i.gov.bd/site-settings"] > .MuiBox-root > .MuiListItemText-root > .MuiTypography-root').click();
        cy.get('[href="https://backoffice.a2i.gov.bd/views"] > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();

        cy.wait(1000);
        cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('ফটোগ্যালারি');
        cy.wait(3000);
        cy.get('.MuiButtonGroup-root > a > .MuiButtonBase-root')
            .click({ multiple: true })

    });




});




























