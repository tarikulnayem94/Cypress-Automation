
describe('npf.a2i.gov.bd', () => {
  // Shared login function with session management
  const login = () => {
    cy.session('a2i-login', () => {
      // cy.visit('https://backoffice.a2i.gov.bd');
      cy.visit('https://backoffice.a2i.gov.bd/');

      cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-global/protocol/openid-connect/auth');
      // cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/protocol/openid-connect/auth');

      // Fill login credentials
      cy.get('input[name="username"]').type('tarikul.sqa@gmail.com');
      cy.get('input[name="password"]').type('Npf@1234');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-global/login-actions/authenticate');
      // cy.url().should('include', 'https://login-npf-v2.softbd.xyz/realms/npf-dev/login-actions/authenticate');
      cy.get('input[name="code"]').type('123456');
      cy.get('.pf-v5-c-button').click();

      // cy.get('span.MuiTypography-body1.nav-item-text').contains('কনটেন্ট').click();
      // cy.get('input[type="text"][role="combobox"][aria-expanded="false"]').click();

      // cy.contains('li', 'Ministry Cluster (BN)').click();
      // cy.get('.MuiGrid-grid-xs-6 > .css-tzsjye > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
      // cy.contains('পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়').click();
      // cy.get('.css-1rj6x3l > .MuiBox-root').click();
      cy.wait(2000);

    });

  };


  beforeEach(() => {
    login();
    cy.visit('https://backoffice.a2i.gov.bd/contents');
  });


  it('(TC - 29)  Setup a new password ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/');

    cy.get('.profileMenu-userName').first().click();
    cy.get('.css-1axcct > .MuiListItemText-root > .MuiTypography-root').click();
    cy.wait(2000);
    cy.get('input[name="old_password"]').type('Npf@12345');
    cy.get('input[name="new_password"]').type('Npf@123456');
    cy.get('input[name="confirm_password"]').type('Npf@123456');
  
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('.css-im29bd > .MuiButtonBase-root').click();
  });





  it('(TC - 36)  🅲🆁🅴🅰🆃🅴 - should manage পাতা (Pages) CRUD operations', () => {
    // Go to পাতা section
    cy.contains('h5', 'পাতা').click();
    cy.url().should('include', '/static-pages');

    cy.contains('button', 'নতুন পাতা').click();
    cy.get('input[name="title_bn"]').type('আজকের বাংলাদেশ (২৫ মে ------ )');
    cy.get('input[name="title_en"]').type('Todays Bangladesh (May 24 ------ )');

    // Fill in content in the rich text editor (Bengali)
    cy.get('div.ck-content')
      .first()
      .realClick()
      .realType('This is the body of the document.{enter}{enter}')
      .realType('This is a new paragraph below.');

    // Fill in content in the rich text editor (English)  
    cy.get('div.ck-content')
      .eq(1)
      .realClick()
      .realType('This is the body of the document.{enter}{enter}')
      .realType('This is a new paragraph below.');

    // Upload image file
    cy.get('input[type="file"][accept="image/*"]')
      .selectFile('cypress/fixtures/images11.png', { force: true });
    cy.wait(2000);
    // // Upload file for bn
    // cy.get('input[type="file"]#\\:rnm\\:').selectFile('cypress/fixtures/pdf.pdf', { force: true });
    cy.get('input[type="file"][accept="application/pdf"]')
      .eq(0)
      .selectFile('cypress/fixtures/pdf.pdf', { force: true });

    // Wait for upload or processing
    cy.wait(2000);

    cy.get('input[type="file"][accept="application/pdf"]')
      .eq(1)
      .selectFile('cypress/fixtures/pdf.pdf', { force: true });

    // // Upload file for en
    // cy.get('input#\\:r27\\:').selectFile('cypress/fixtures/pdf.pdf', { force: true });

    // Save and Close button
    cy.contains('button.MuiButton-containedPrimary', 'তৈরি করে বন্ধ করুন')
      .should('be.visible')
      .click({ force: true }) // Use force if element is covered
    cy.wait(2000);
    cy.wait(2000);

  });



  it('(TC - 38)  View an existing page', () => {
    // Go to পাতা section
    cy.contains('h5', 'পাতা').click();
    cy.wait(2000);

    // Search the page
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input')
      .clear()
      .type('আজকের বাংলাদেশ (২৫ মে ------ )');
    cy.wait(2000);

    cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').click();
    cy.wait(2000);

    cy.get('.css-faujvq > .MuiButtonBase-root').click();
    cy.wait(2000);
  });



  it('(TC - 37)  Edit an existing page', () => {
    // Go to পাতা section
    cy.contains('h5', 'পাতা').click();

    // Search the page 
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input')
      .clear()
      .type('আজকের বাংলাদেশ (২৫ মে ------ )');

    cy.wait(2000);
    // Click edit icon
    // cy.contains('tr', 'আজকের বাংলাদেশ(২৫ মে', { timeout: 5000 })
    //   .find('a[aria-label="সম্পাদনা"]')
    //   .click();
    cy.get('[aria-label="সম্পাদনা"] > .MuiButtonBase-root').click();


    // Enter title bn and en 
    cy.get('input[name="title_bn"]').clear();
    cy.get('input[name="title_bn"]').type('একনজরে আজকের বাংলাদেশ');
    cy.get('input[name="title_en"]').clear();
    cy.get('input[name="title_en"]').type('একনজরে আজকের বাংলাদেশ');

    // Enter details bn and en 
    cy.get('div.ck-content')
      .first()
      .realClick()
      .realType('This is the body of the document.{enter}{enter}')
      .realType('This is a new paragraph below.');

    // Fill in content in the rich text editor (English)  
    cy.get('div.ck-content')
      .eq(1)
      .realClick()
      .realType('This is the body of the document.{enter}{enter}')
      .realType('This is a new paragraph below.');

    // Upload image file
    // cy.get('input[type="file"][accept="image/*"]')
    //   .selectFile('cypress//fixtures//images11.png', { force: true });

    // // Upload file for bn
    // cy.get('input#\\:r2b\\:')
    //   // cy.get(':nth-child(6) > :nth-child(1) > .css-1eybjch > .css-1gtanqs > :nth-child(1) > .MuiBox-root > .MuiFormLabel-root')
    //   .selectFile('cypress/fixtures/pdf.pdf', { force: true });

    // // Upload file for en
    // cy.get('input#\\:r2c\\:')
    //   // cy.get(':nth-child(7) > :nth-child(1) > .css-1eybjch > .css-1gtanqs > :nth-child(1) > .MuiBox-root > .MuiFormLabel-root')
    //   .selectFile('cypress/fixtures/pdf.pdf', { force: true });

    // // Save the page
    cy.contains('button', 'সংরক্ষণ করে বন্ধ করুন').click();
    cy.wait(2000);
  });



  it('(TC - 39)  preview an existing page', () => {
    // Go to পাতা section
    cy.contains('h5', 'পাতা').click();

    // Search the page
    // cy.get('input[placeholder="Search"]')
    //   .clear()
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input')
      .type('আজকের বাংলাদেশ (২৫ মে ------ )');

    // Page Preview
    cy.contains('tr', 'আজকের বাংলাদেশ (২৫ মে ------ )')
      .find('a[aria-label="প্রিভিউ"]')
      .invoke('removeAttr', 'target')
      .click();

    cy.go('back');
  });



  it('(TC - 40)  Active/Inactive an existing page', () => {
    // Go to পাতা section
    cy.contains('h5', 'পাতা').click();
    cy.wait(2000);

    // Search and preview
    // cy.get('input[placeholder="Search"]')
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input')
      .clear()
      .type('একনজরে আজকের বাংলাদেশ');
    cy.wait(3000);

    // Switch the Toggle
    cy.get('.MuiSwitch-input')
      .eq(1) // Select second switch
      .click({ force: true });

    // Yes to confirm
    cy.contains('button', 'হ্যাঁ').click();

    // Clear search fields
    cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
  });



  it('(TC - 41)  Delete an existing page', () => {
    // Go to পাতা section
    cy.contains('h5', 'পাতা').click();

    // Search the page 
    // cy.get('input[placeholder="Search"]')
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').clear()
      .type('একনজরে আজকের বাংলাদেশ');
    cy.wait(3000);

    // Delete the page 
    // cy.contains('tr', 'Form 1').find('button[aria-label="মুছুন"]').click();
    cy.get('[aria-label="মুছুন"]').click({ multiple: true });
    cy.wait(3000);

    // Confirm delete 
    cy.contains('button', 'হ্যাঁ').click();

    // Clear search fields
    cy.get('svg[data-testid="CancelIcon"]').parent('button').click();
  });






  it('(TC - 42)  🅲🆁🅴🅰🆃🅴 - News', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('খবর').click();
    cy.get('a[href="https://backoffice.a2i.gov.bd/news/create"] button').click();

    cy.get('input[name="title_bn"]').type("news in bangla for softbd");
    // cy.get('input[id="\\:r2\\:"]').type("news prefix in bangla for softbd"), { force: true };
    // cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp')
    // .type('Your text')
  
    cy.get('input[name="title_en"]').type("news in english");
    // cy.get('input[id="\\:r5:\\:"]').type("news prefix in bangla for softbd"), { force: true };

    cy.wait(1000);
    // // Upload image file
    cy.wait(2000);
    cy.get('input[type="file"][accept="image/*"]').first()
      .selectFile('cypress//fixtures//images11.png', { force: true });

    cy.get('input[type="file"][accept="image/*"]').eq(0)
      .selectFile('cypress/fixtures/images11.png', { force: true });
    cy.wait(2000);

    // Upload file for bn
    // cy.get('input#\\:r27\\:').first()
    //   .selectFile('cypress//fixtures//pdf.pdf', { force: true });
    // cy.wait(2000);
    cy.get('input[type="file"][accept="application/pdf"]')
      .eq(1)
      .selectFile('cypress/fixtures/pdf.pdf', { force: true });
    // // Upload file for en
    // cy.get('input#\\:r28\\:').eq(0)
    //   .selectFile('cypress/fixtures/pdf.pdf', { force: true });

    cy.get('.MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.wait(1000);

    cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('.MuiPickersDay-today').click();
    cy.wait(1000);

    cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1750874400000"]').click(), { multiple: true };
    cy.wait(1000);
    // cy.get('.MuiDialogActions-root > :nth-child(2)').click(), { multiple: true };
    cy.wait(3000);

  });




  it('(TC - 43)  Edit News', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');

    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('খবর').click();
    cy.get(':nth-child(1) > :nth-child(10) > .MuiButtonGroup-root > [aria-label="সম্পাদনা"] > .MuiButtonBase-root').click();
    // cy.get(':nth-child(3) > :nth-child(9) > .MuiButtonGroup-root > [aria-label="সম্পাদনা"] > .MuiButtonBase-root').click();

    cy.get('input[name="title_bn"]').clear();
    cy.get('input[name="title_bn"]').type("edited news in bangla");

    cy.get('input[name="title_en"]').clear();
    cy.get('input[name="title_en"]').type("edited news in english");
    cy.wait(1000);

    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > [data-testid="CalendarIcon"]').click();
    // cy.get('[data-timestamp="1748109600000"]').click();

    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click({ multiple: true });
    // cy.get('.MuiIconButton-edgeStart').click({ multiple: true });
    // cy.wait(1000);

    // cy.get('[data-timestamp="1753034400000"]').click();
    cy.wait(1000);

    cy.get('.MuiDialogActions-root > :nth-child(1)').click({ multiple: true });
  });



  it('(TC - 46)  Update status News', () => {
    // cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('খবর').click();
    // cy.contains('h5', 'খবর').click();
    cy.get('.MuiInputBase-input').type("edited news in english");
    cy.wait(5000);

    // Click only the first toggle (or a specific one)
    cy.get(':nth-child(9) > .MuiBox-root')
    //   .first()
    //   .find(':nth-child(8)')
      .click();

    // Confirm the modal
    cy.get('.MuiDialogActions-root > .MuiButton-contained')
      .contains('হ্যাঁ') // Use text if needed
      .click({ force: true });
    cy.wait(1000);
  });


  it('(TC - 44)  view news from backoffice', () => {
    // cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('খবর').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("edited news in english");

    cy.wait(5000);
    cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').click();
    cy.get('.css-faujvq > .MuiButtonBase-root').click(), { multiple: true };
    // cy.wait(5000);
    // cy.go('back');
    // cy.get('a[target="_blank"]')
    //   .invoke('removeAttr', 'target')
    //   .click();
    cy.wait(2000);
  });



  it('(TC - 45)  preview news from backoffice', () => {
    // cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('খবর').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("edited news in english");

    cy.wait(5000);
    cy.get('.MuiButtonGroup-root > [target="_blank"] > .MuiButtonBase-root').click(), { multiple: true };
    cy.wait(5000);
    // cy.go('back');
    // cy.get('a[target="_blank"]')
    //   .invoke('removeAttr', 'target')
    //   .click();
    cy.wait(2000);
  });



  it('(TC - 47)  delete news from backoffice', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');

    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('খবর').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("edited news in bangla");
    cy.wait(2000);
    // cy.get(':nth-child(2) > :nth-child(9) > .MuiButtonGroup-root > [aria-label="মুছুন"]').click();
    cy.get('[aria-label="মুছুন"]').click(), { multiple: true };
    cy.wait(2000);

    cy.get('.MuiButton-contained > .MuiStack-root').click();
    cy.wait(1000);
  });



  it('(TC - 48)  🅲🆁🅴🅰🆃🅴 - a new banner ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ব্যানার').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    // cy.contains('h5', 'ব্যানার').click();
    // cy.url().should('include', '/top-banners');

    cy.get('input[name="title_bn"]').type("Banner title BN");
    cy.get('input[name="title_en"]').type("Banner title EN");

    // Fill in content in the rich text editor (Bengali)
    cy.get('div.ck-content')
      .first()
      .realClick()
      .realType('This is the body of the document.{enter}{enter}')
      .realType('This is a new paragraph below.');

    // Fill in content in the rich text editor (English)  
    cy.get('div.ck-content')
      .eq(1)
      .realClick()
      .realType('This is the body of the document.{enter}{enter}')
      .realType('This is a new paragraph below.');

    // // Upload image file
    cy.wait(2000);
    cy.get('input[type="file"][accept="image/*"]').first()
      .selectFile('cypress//fixtures//npf.jpg', { force: true });

    cy.get('input[name="sort_order"]').type("91");
    cy.wait(2000);

    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
  });



  it('(TC - 49) & (TC - 50)   View and update Banner from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ব্যানার').click();
    cy.wait(1000);
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("Test 21");
    cy.wait(3000);
    cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('.MuiButton-contained').contains('সম্পাদনা').click();

    // Fill in content in the rich text editor (Bengali)
    cy.get('div.ck-content')
      .first()
      .clear()
      .realClick()
      .realType('Banner March.{enter}')
      .realType('Banner March');
    cy.wait(1000);
    // Fill in content in the rich text editor (English)  
    cy.get('div.ck-content').clear()
      .eq(1)
      .clear()
      .realClick()
      .realType('Banner March{enter}')
      .realType('Banner March');

    cy.wait(2000);
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.wait(1000);
    cy.wait(1000);
  });



  it('(TC - 52) & (TC - 53)  Delete and Trushed-Back Banner from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ব্যানার').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("তারুণ্যের উৎসব ২০২৫");
    cy.wait(3000);

    cy.get('[aria-label="মুছুন"]').first().click(), { multiple: true };
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.wait(1000);
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
    cy.wait(1000);

  });



  it('(TC - 54)  🅲🆁🅴🅰🆃🅴 - new Advertisement ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বিজ্ঞাপন').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();

    cy.get('input[name="title_bn"]').type("Advertisement title BN");
    cy.get('input[name="title_en"]').type("Advertisement title EN");

    // // Fill in content in the rich text editor (Bengali)
    // cy.get('div.ck-content')
    //   .first()
    //   .realClick()
    //   .realType('This is the body of the document.{enter}')
    //   .realType('This is a new paragraph.');

    // // Fill in content in the rich text editor (English)  
    // cy.get('div.ck-content')
    //   .eq(1)
    //   .realClick()
    //   .realType('This is the body of the document.{enter}')
    //   .realType('This is a new paragraph.');
    // cy.wait(1000);

    // Upload image file
    cy.wait(2000);
    cy.get('input[type="file"][accept="image/*"]').first()
      .selectFile('cypress//fixtures//npf.jpg', { force: true });
    cy.get('#field_is_slide').click();

    cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.wait(2000);
    cy.get('[data-timestamp="1750528800000"]').click();

    cy.get('[aria-label="6 hours"]').click();
    cy.get('[aria-label="30 minutes"]').click();
    cy.get('[aria-label="Select meridiem"] > [tabindex="-1"]').click();
    cy.wait(2000);
    cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click({ multiple: true });
    cy.get('.MuiIconButton-edgeStart').click({ multiple: true });
    cy.get('[data-timestamp="1753812000000"]').click({ multiple: true });
    cy.wait(2000);
    cy.get('[aria-label="11 hours"]').click();
    cy.get('[aria-label="55 minutes"]').click();
    cy.get('[aria-label="Select meridiem"] > [tabindex="-1"]').click({ multiple: true });
    cy.wait(2000);
    // // Publication Date
    // cy.get('button[aria-label^="Choose date"]').eq(0).click();                       // open date picker
    // cy.contains('button', '31').click();                                       // select 10th of the month
    // cy.wait(2000);

    cy.wait(1000);
    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click({ multiple: true });
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
  });




  it('(TC - 55)  Advertisement status update from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বিজ্ঞাপন').click();

    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("new zealand national cricket team vs pakistan national cricket team timeline");
    cy.wait(2000);
    cy.get(':nth-child(3) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').eq(0).click();
    cy.wait(2000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
  });



  it('(TC - 56) & (TC - 57)  View and Preview Advertisement from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বিজ্ঞাপন').click();

    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("new zealand national cricket team vs pakistan national cricket team timeline");
    cy.wait(3000);
    cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').eq(0).click();
    cy.wait(2000);
    cy.get('.css-faujvq > .MuiButtonBase-root').click();
    cy.get('.MuiButtonGroup-root > [target="_blank"] > .MuiButtonBase-root').eq(0).click();
  });



  it('(TC - 59)  Delete and Trushed-Back Advertisement from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বিজ্ঞাপন').click();

    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("new zealand national cricket team vs pakistan national cricket team timeline");
    cy.wait(3000);
    cy.get(':nth-child(1) > :nth-child(4) > .MuiButtonGroup-root > [aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').eq(0).click({ multiple: true });
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });



  it('(TC - 60)  🅲🆁🅴🅰🆃🅴 - a new notice ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');

    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('নোটিশ').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title_bn"]').type("Notice title BN");
    cy.get('input[name="title_en"]').type("Notice title EN");
    cy.wait(1000);
    // Upload file
    // cy.get('input#\\:r1i0\\:').selectFile('cypress/fixtures/pdf.pdf', { force: true });
    cy.get('input[type="file"][accept="application/pdf"]')
      .selectFile('cypress/fixtures/pdf.pdf', { force: true })

    // Upload image file
    cy.get('input[type="file"][accept="image/*"]').selectFile('cypress//fixtures//npf.jpg', { force: true });

    // Fill in content in the rich text editor (Bengali)
    // cy.get('div.ck-content')
    //   .first()
    //   .realClick()
    //   .realType('This is the body of the document.{enter}')
    //   .realType('This is a new paragraph.');

    // Fill in content in the rich text editor (English)  
    // cy.get('div.ck-content')
    //   .eq(1)
    //   .realClick()
    //   .realType('This is the body of the document.{enter}')
    //   .realType('This is a new paragraph.');
    // cy.get('.MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.wait(2000);
    cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('.Mui-focusVisible').click();

    cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click({ multiple: true });
    cy.wait(2000);
    cy.get('.MuiIconButton-edgeStart').click({ multiple: true });
    cy.get('[data-timestamp="1753034400000"]').click();

    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click({ multiple: true });
  });




  it('(TC - 61),  (TC - 64), (TC - 65)  Status changes, Delete and Trushed-Back notices from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('নোটিশ').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("Provident aliquam a");
    cy.wait(3000);

    cy.get(':nth-child(9) > .MuiBox-root').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
  });



  it('(TC - 63)  Preview Notices from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('নোটিশ').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("Provident aliquam a");
    cy.wait(3000);
    cy.get('[aria-label="প্রিভিউ"]').click({ multiple: true });
  });



  it('(TC - 66)  🅲🆁🅴🅰🆃🅴 - a new Tender  ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');

    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('টেন্ডার').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title_bn"]').type("Tender title BN");
    cy.get('input[name="title_en"]').type("Tender title EN");
    cy.wait(1000);

    // // Fill in content in the rich text editor (Bengali)
    // cy.get('div.ck-content')
    //   .first()
    //   .realClick()
    //   .realType('This is the body of the document.{enter}')
    //   .realType('This is a new paragraph.');

    // // Fill in content in the rich text editor (English)  
    // cy.get('div.ck-content')
    //   .eq(1)
    //   .realClick()
    //   .realType('This is the body of the document.{enter}')
    //   .realType('This is a new paragraph.');
    cy.get('input[name="tender_no"]').type(2);
    // Upload file
    cy.get('input[type="file"][accept="application/pdf"]')
      .selectFile('cypress/fixtures/pdf.pdf', { force: true })

    cy.wait(1000);
    cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1750615200000"]').click();

    cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click({ multiple: true });
    cy.wait(1000);
    cy.get('[data-timestamp="1751220000000"]').click();

    // cy.get('.MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
    // cy.contains('li', 'Tender Type (1)').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click({ multiple: true });
  });



  it('(TC - 68)  Status changes, Delete and Trushed-Back tender from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('টেন্ডার').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("জাতীয় ক্রীড়া পুরস্কার প্রদানের জন্য স্বর্ণপদক(বক্সসহ) ক্রয়-দরপত্র আহবান বিজ্ঞপ্তি");
    cy.wait(3000);

    cy.get(':nth-child(9) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    // cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });



  it('(TC - 67) Preview tender from tender data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('টেন্ডার').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("জাতীয় ক্রীড়া পুরস্কার প্রদানের জন্য স্বর্ণপদক(বক্সসহ) ক্রয়-দরপত্র আহবান বিজ্ঞপ্তি");
    cy.wait(3000);
    cy.get('[aria-label="প্রিভিউ"]').click({ multiple: true });
  });



  it('(TC - 69)  🅲🆁🅴🅰🆃🅴 - a new File  ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফাইল').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title_bn"]').type("File title BN");
    cy.get('input[name="title_en"]').type("File title EN");
    cy.wait(1000);

    // Upload file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/pdf.pdf', { force: true });
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > :nth-child(2)').click({ multiple: true });
  });



  it('(TC - 70) Preview files  ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফাইল').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("File title BN");
    cy.wait(3000);

    cy.get('.MuiButtonGroup-root > [target="_blank"] > .MuiButtonBase-root').first().click();
    cy.wait(1000);
  });



  it('(TC - 71) Status changes, Delete and Trushed-Back File from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফাইল').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("File title BN");
    cy.wait(3000);

    cy.get(':nth-child(3) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().click();
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);

    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });



  it('(TC - 72) 🅲🆁🅴🅰🆃🅴 - a new Annual Report  ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');

    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বার্ষিক প্রতিবেদন').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title"]').type("Annual Report title BN");
    cy.wait(1000);

    // Fill in content in the rich text editor (Bengali)
    cy.get('div.ck-content')
      .first()
      .realClick()
      .realType('This is the body of the document.{enter}')
      .realType('This is a new paragraph.');

    // Fill in content in the rich text editor (English)  
    cy.get('div.ck-content')
      .eq(1)
      .realClick()
      .realType('This is the body of the document.{enter}')
      .realType('This is a new paragraph.');

    // Upload file
    cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/pdf.pdf', { force: true });
    cy.get('input[type="file"]').eq(1).selectFile('cypress/fixtures/pdf.pdf', { force: true });

    cy.wait(1000);
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1748800800000"]').click();
    cy.get('[aria-label="Select meridiem"] > [tabindex="-1"]').click();

    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
  });



  it('(TC - 73) Preview Annual Report ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');

    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বার্ষিক প্রতিবেদন').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("Officiis anim sunt n");
    cy.wait(3000);

    cy.get('.MuiButtonGroup-root > [target="_blank"] > .MuiButtonBase-root').first().click();
    cy.wait(1000);
  });



  it('(TC - 74) & (TC - 75)  Status changes, Delete and Trushed-Back Annual Report from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বার্ষিক প্রতিবেদন').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("Officiis anim sunt n");
    cy.wait(3000);

    cy.get(':nth-child(4) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().click();
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);

    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });



  it('(TC - 76) 🅲🆁🅴🅰🆃🅴 - a new Photo Galleries ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফটোগ্যালারি').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title_bn"]').type("Photo Galleries title BN");
    cy.get('input[name="title_en"]').type("Photo Galleries title EN");
    cy.wait(1000);

    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('.MuiPickersCalendarHeader-labelContainer > .MuiButtonBase-root').click();
    cy.get(':nth-child(126) > .MuiPickersYear-yearButton').click();
    cy.get('.MuiIconButton-edgeStart').click(); cy.wait(1000);
    cy.get('.MuiIconButton-edgeStart').click(); cy.wait(1000);
    cy.get('.MuiIconButton-edgeStart').click(); cy.wait(1000);
    cy.get('.MuiIconButton-edgeStart').click(); cy.wait(1000);
    cy.get('.MuiIconButton-edgeStart').click(); cy.wait(1000);
    cy.wait(2000);
    cy.get('[data-timestamp="1764093600000"]').click();

    // Upload image file
    cy.wait(2000);
    cy.get('input[type="file"][accept="image/*"]').first().selectFile('cypress//fixtures//npf.jpg', { force: true });
    cy.get('input[type="file"][accept="image/*"]').eq(1).selectFile('cypress//fixtures//images11.png', { force: true });

    // cy.get('.MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
    // cy.contains('li', 'বিবিধ').click();
    cy.wait(2000);
    // cy.get(':nth-child(7) > .MuiFormControl-root > .css-1xa7wbs > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().click();
    // cy.get(':nth-child(8) > .MuiFormControl-root > .css-1xa7wbs > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();

    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
  });



  it('(TC - 77) Preview Photo Galleries ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফটোগ্যালারি').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('যুব মেলা ২০২৪ উদ্বোধন');
    cy.wait(3000);

    cy.get('.MuiButtonGroup-root > [target="_blank"] > .MuiButtonBase-root').click();
  });



  it('(TC - 78) & (TC - 79)  Status changes, Delete and Trushed-Back Photo Galleries data from data lists', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফটোগ্যালারি').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('যুব মেলা ২০২৪ উদ্বোধন');
    cy.wait(3000);

    cy.get(':nth-child(7) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();

    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });


  it('(TC - 80)   🅲🆁🅴🅰🆃🅴 - a new Footer menu', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফুটার মেনু').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title_bn"]').type("Footer menu title BN");
    cy.get('input[name="title_en"]').type("Footer menu title EN");
    cy.wait(1000);

    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get(':nth-child(3) > :nth-child(2) > .MuiButtonGroup-root > .MuiButton-outlinedInherit').click();
    cy.wait(1000);
    cy.get(':nth-child(2) > :nth-child(10) > .MuiButtonGroup-root > .MuiButton-root').click();
    cy.wait(1000);
    cy.get('input[name="links[0].caption_bn"]').type("Footer menu (BN)");
    cy.get('input[name="links[0].caption_en"]').type("Footer menu (EN)");
    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
  });



  it(' (TC - 81) & (TC - 82)  Status changes, View, Edit, Delete and Trushed-Back Footer menu from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('ফুটার মেনু').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("Footer menu title BN");
    cy.wait(3000);

    cy.get(':nth-child(5) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().click();
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);

    cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').click();
    cy.get('.css-faujvq > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="সম্পাদনা"] > .MuiButtonBase-root').click();
    cy.get('input[name="links[0].caption_bn"]').clear().type("Footer menu (BN)");
    cy.get('input[name="links[0].caption_en"]').clear().type("Footer menu (EN)");

    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });



  it('(TC - 85)  🅲🆁🅴🅰🆃🅴 - a new Internal eServices', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('অভ্যন্তরীণ ই-সেবা').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title_bn"]').type("Internal eServices title BN");
    cy.get('input[name="title_en"]').type("Internal eServices title EN");
    cy.wait(1000);

    // // Fill in content in the rich text editor (Bengali)
    cy.get('div.ck-content')
      .first()
      .realClick()
      .realType('Bengali: This is the body of the document.{enter}{enter}')
      .realType('Bengali: This is a new paragraph below.');

    // // Fill in content in the rich text editor (English)  
    cy.get('div.ck-content')
      .eq(1)
      .realClick()
      .realType('English: This is the body of the document.{enter}{enter}')
      .realType('English: This is a new paragraph below.');

    cy.get('input[name="sort_order"]').type("13");
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.wait(2000);
    cy.get(':nth-child(2) > :nth-child(2) > .MuiButtonGroup-root > .MuiButton-outlinedInherit').click();
    cy.wait(3000);

    cy.get(':nth-child(1) > :nth-child(10) > .MuiButtonGroup-root > .MuiButton-root').click();
    cy.wait(1000);
    cy.get('input[name="link[0].caption_bn"]').type("Internal eServices (BN)");
    cy.get('input[name="link[0].caption_en"]').type("Internal eServices (EN)");

    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
  });



  it('(TC - 84)  Preview & View Internal eServices', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('অভ্যন্তরীণ ই-সেবা').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('Smart Training Management System');
    cy.wait(3000);

    cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').click();
    cy.get('.css-faujvq > .MuiButtonBase-root').click();

    cy.get('.MuiButtonGroup-root > [target="_blank"] > .MuiButtonBase-root').click();
    cy.wait(5000);
  });



  it('(TC - 84) & (TC - 85)  Status changes, Delete and Trushed-Back Internal eServices from data lists', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('অভ্যন্তরীণ ই-সেবা').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('Smart Training Management System');
    cy.wait(3000);

    cy.get(':nth-child(6) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().click();
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);

    cy.get('[aria-label="প্রদর্শন"] > .MuiButtonBase-root').click();
    cy.get('.css-faujvq > .MuiButtonBase-root').click();
    cy.wait(1000);

    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });










  it.skip(' (TC - ) - 🆃🅴 - Other test cases are used for the script testing - Blew Here ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
  });



  it.skip(' (TC - ) -  🅲🆁🅴🅰🆃🅴 - a new Notification Circular', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বিজ্ঞপ্তি ও প্রজ্ঞাপন').click();
    cy.get('.MuiStack-root > a > .MuiButtonBase-root').click();
    cy.get('input[name="title_bn"]').type("Notification Circular title BN");
    cy.get('input[name="title_en"]').type("Notification Circular title EN");
    cy.wait(1000);
    cy.get('input[name="tag_bn"]').type("Notification Circular tag BN");
    cy.get('input[name="tag_en"]').type("Notification Circular tag EN");

    cy.get('input[name="memorial_no"]').type("A1B2C3D4");
    // Upload file
    cy.get('input[type="file"]').selectFile('cypress/fixtures/pdf.pdf', { force: true });
    cy.get('.MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
    cy.contains('li', 'ডিজিটাল গার্ড ফাইল টাইপ 1').click();

    cy.wait(1000);
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1748887200000"]').click();

    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
  });



  it.skip(' (TC - ) - Preview Notification Circular ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বিজ্ঞপ্তি ও প্রজ্ঞাপন').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('সামাজিক বনায়ন বিধিমালা, ২০০৪');
    cy.wait(3000);

    cy.get('.MuiButtonGroup-root > [target="_blank"] > .MuiButtonBase-root').click();
    cy.wait(5000);
  });



  it.skip(' (TC - ) -  Status changes, Delete and Trushed-Back Notification Circular from data lists ', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.MuiCardContent-root.content-item-content.css-1qw96cp').contains('বিজ্ঞপ্তি ও প্রজ্ঞাপন').click();
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type('সামাজিক বনায়ন বিধিমালা, ২০০৪');
    cy.wait(3000);

    cy.get(':nth-child(8) > .MuiBox-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().click();
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);

    cy.get('[aria-label="মুছুন"]').click();
    cy.wait(1000);
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click();
    cy.wait(1000);
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get('[aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
  });






  it.skip(' (TC - ) -  🅲🆁🅴🅰🆃🅴 - inportant link', () => {
    // Go to section
    cy.contains('h5', 'গুরুত্বপূর্ণ লিংক').click();
    cy.url().should('include', '/external-links');

    // Add new
    cy.contains('button', 'নতুন গুরুত্বপূর্ণ লিংক').click();

    // Fill in Bengali title
    cy.get('input[name="title_bn"]').type('নতুন গুরুত্বপূর্ণ লিংক - ২৫ মে ------ )');

    // Fill in English title
    cy.get('input[name="title_en"]').type('Importent link - May 24 ------ )');

    cy.get('input[name="sort_order"]').type(2);
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get(':nth-child(5) > :nth-child(2) > .MuiButtonGroup-root > .MuiButton-outlinedInherit').click();

    // add extarnal link
    cy.wait(2000);
    cy.get('.css-4zmibr > .MuiInputBase-root > .MuiInputBase-input').type("ব্যানার মার্চ"), { multiple: true };
    cy.wait(2000);
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(2)').click({ force: true }), { multiple: true };
    cy.get('.MuiButtonGroup-root > .MuiButton-root').click();

    cy.get('input[name="links[0].caption_bn"]').type("ক্যাপশন (বাংলা): গুরুত্বপূর্ণ লিংক");
    cy.get('input[name="links[0].caption_en"]').type("ক্যাপশন (ইংরেজি): ব্যানার মার্চ");
    cy.wait(1000);
    cy.get('.MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.wait(1000);
    // delete and recover from trush -------
    cy.get(':nth-child(1) > :nth-child(7) > .MuiButtonGroup-root > [aria-label="মুছুন"]').click();
    cy.get('.MuiButton-contained > .MuiStack-root').click();
    cy.get('.css-h1djnr > .MuiBox-root > .MuiButtonBase-root').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > :nth-child(7) > .MuiButtonGroup-root > [aria-label="পুনরুদ্ধার করুন"]').click();
    cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
    cy.wait(2000);
  });


  it.skip(' (TC - ) - Select the element and print its text from dashboard', () => {
    cy.visit('https://backoffice.a2i.gov.bd');

    cy.get('.css-1rg8f7z') // Replace with your actual selector
      .invoke('text') // Extract the text content
      .then((text) => {
        cy.log('Text from the page: ' + text); // Cypress test log
        console.log('Text from the page:', text); // Browser dev console
      });

    cy.get('.css-xadj33')// Replace with your actual selector
      .invoke('text') // Extract the text content
      .then((text) => {
        cy.log('Text from the page: ' + text); // Cypress test log
        console.log('Text from the page:', text); // Browser dev console
      });
    cy.wait(2000);
  });


  it.skip(' (TC - ) - Drag & Drop', () => {
    cy.visit('https://backoffice.a2i.gov.bd/contents');
    cy.get('.css-6v70ts > .MuiButtonBase-root').click();
    cy.get(':nth-child(65) > a > [draggable="true"] > .MuiCardContent-root')
    cy.get(':nth-child(65) > a > [draggable="true"] > .MuiCardContent-root').drag(':nth-child(64) > a > [draggable="true"] > .MuiCardContent-root');

    // cy.get(':nth-child(65) > a > [draggable="true"] > .MuiCardContent-root')
    // cy.get(':nth-child(64) > a > [draggable="true"] > .MuiCardContent-root')
    cy.get('.MuiButton-contained').click();
    cy.wait(2000);
  });


});




























