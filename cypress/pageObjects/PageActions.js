class PageActions {
  // Selectors
  getPageSection() {
    return cy.contains('h5', 'পাতা');
  }

  getNewPageButton() {
    return cy.contains('button', 'নতুন পাতা');
  }

  getSearchInput() {
    return cy.get('input[placeholder="Search by শিরোনাম"]');
  }

  getTitleBnInput() {
    return cy.get('input[name="title_bn"]');
  }

  getTitleEnInput() {
    return cy.get('input[name="title_en"]');
  }

  getContentBnEditor() {
    return cy.get('div.ck-content').first();
  }

  getContentEnEditor() {
    return cy.get('div.ck-content').eq(1);
  }

  getImageUploadInput() {
    return cy.get('input[type="file"][accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"]');
  }
/*
  getPdfUploadBnInput() {
    return cy.get('input[type="file"][accept="application/pdf"]').eq(0); // Replace unstable ID
  }

  getPdfUploadEnInput() {
    return cy.get('input[type="file"][accept="application/pdf"]').eq(1); // Replace unstable ID
  }
  */

    getPdfUploadBnInput() {
    return cy.get('[data-testid="FileUploadIcon"]').eq(0).parent('label')
        .find('input[type="file"][multiple]'); 
  }

    getPdfUploadEnInput() {
    return cy.get('[data-testid="FileUploadIcon"]').eq(1).parent('label')
        .find('input[type="file"][multiple]'); 
  }

  getSaveButton() {
    return cy.contains('button', 'তৈরি করে বন্ধ করুন');
  }

  getEditSaveButton() {
    return cy.contains('button', 'সংরক্ষণ করে বন্ধ করুন');
  }

  getCancelButton() {
    return cy.contains('button', 'বাতিল');
  }

  getConfirmButton() {
    return cy.contains('button', 'হ্যাঁ');
  }

  getClearSearchButton() {
    return cy.get('svg[data-testid="CancelIcon"]').parent('button');
  }

  // Actions
  navigateToPageSection() {
    this.getPageSection().click();
  }

  clickNewPageButton() {
    this.getNewPageButton().click();
  }

  searchPage(title) {
    this.getSearchInput().clear().type(`${title}{enter}`);
    cy.wait(2000); // Wait for search results
  }

  enterTitleBn(title) {
    this.getTitleBnInput().clear().type(title);
  }

  enterTitleEn(title) {
    this.getTitleEnInput().clear().type(title);
  }

  enterContentBn(content) {
    this.getContentBnEditor().realClick().realType(content);
  }

  enterContentEn(content) {
    this.getContentEnEditor().realClick().realType(content);
  }

  uploadImage(fileName) {
    this.getImageUploadInput().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  }
  // uploadBnFiles(fileName) {
  //   this.getPdfUploadBnInput().selectFile(`cypress/fixtures/${fileName}`, { force: true, multiple: true });
  // }

  // uploadEnFiles(fileName) {
  //   this.getPdfUploadEnInput().selectFile(`cypress/fixtures/${fileName}`, { force: true, multiple: true });
  // }

  uploadPdfBn(fileNames) {
  const filePaths = fileNames.map(file => `cypress/fixtures/${file}`);
  this.getPdfUploadBnInput().selectFile(filePaths, { force: true, multiple: true }).trigger('change', { force: true });
}

uploadPdfEn(fileNames) {
  const filePaths = fileNames.map(file => `cypress/fixtures/${file}`);
  this.getPdfUploadEnInput().selectFile(filePaths, { force: true, multiple: true }).trigger('change', { force: true });
}

  saveAndClose() {
    this.getSaveButton().click();
    cy.wait(1000);
  }

  editAndSave() {
    this.getEditSaveButton().click();
    cy.wait(1000);
  }

  clickView(title) {
    cy.contains('tr', title).find('a[aria-label="প্রদর্শন"]').click();
    cy.wait(2000);
  }

  clickEdit(title) {
    cy.contains('tr', title).find('a[aria-label="সম্পাদনা"]').click();
  }

  clickPreview(title) {
    cy.contains('tr', title).find('a[aria-label="প্রিভিউ"]').invoke('removeAttr', 'target').click();
  }

  toggleStatus(title) {
    cy.contains('tr', title).find('.MuiSwitch-input').click({ force: true });
    this.getConfirmButton().click();
  }

  deletePage(title) {
    cy.contains('tr', title).find('button[aria-label="মুছুন"]').click();
    this.getConfirmButton().click();
  }

  clearSearch() {
    this.getClearSearchButton().click();
  }

  // Combined methods
  createPage(data) {
    this.navigateToPageSection();
    this.clickNewPageButton();
    this.enterTitleBn(data.title_bn);
    this.enterTitleEn(data.title_en);
    this.enterContentBn(data.content_bn);
    this.enterContentEn(data.content_en);
    this.uploadImage(data.imageFile);
    this.uploadBnFiles(data.pdfFile);
    this.uploadEnFiles(data.pdfFile);
    this.saveAndClose();
  }

  viewPage(data) {
    this.navigateToPageSection();
    this.searchPage(data.searchTitle);
    this.clickView(data.searchTitle);
    this.getCancelButton();
  }

  editPage(data) {
    this.navigateToPageSection();
    this.searchPage(data.searchTitle);
    this.clickEdit(data.searchTitle);
    this.enterTitleBn(data.title_bn);
    this.enterTitleEn(data.title_en);
    this.enterContentBn(data.content_bn);
    this.enterContentEn(data.content_en);
    this.uploadImage(data.imageFile);
    this.uploadPdfBn(data.pdfFile);
    this.uploadPdfEn(data.pdfFile);
    this.editAndSave();
  }

  previewPage(data) {
    this.navigateToPageSection();
    this.searchPage(data.searchTitle);
    this.clickPreview(data.searchTitle);
    cy.go('back');
  }

  togglePageStatus(data) {
    this.navigateToPageSection();
    this.searchPage(data.searchTitle);
    this.toggleStatus(data.searchTitle);
    this.clearSearch();
  }

  deletePageRecord(data) {
    this.navigateToPageSection();
    this.searchPage(data.searchTitle);
    this.deletePage(data.searchTitle);
    this.clearSearch();
  }
}

export default PageActions;