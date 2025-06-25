class NewsActions {
  // Selectors
  getNewsSection() {
    return cy.contains('h5', 'খবর');
  }

  getNewNewsButton() {
    return cy.contains('button', 'নতুন খবর');
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
    return cy.get('input[type="file"][accept="image/*"]').first();
  }

  getPdfUploadInput() {
    return cy.get('input[type="file"][accept="application/pdf"]').first();
  }

  getSubOfficeCheckbox() {
    return cy.get('input[type="checkbox"][data-indeterminate="false"]');
  }

  getPublicationDatePicker() {
    return cy.get('input[placeholder="DD/MM/YYYY"]').eq(0);
  }

  getArchiveDatePicker() {
    return cy.get('input[placeholder="DD/MM/YYYY"]').eq(1);
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
  navigateToNewsSection() {
    this.getNewsSection().click();
  }

  clickNewNewsButton() {
    this.getNewNewsButton().click();
  }

  searchNews(title) {
    this.getSearchInput().clear().type(`${title}{enter}`);
    cy.wait(2000);
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

  uploadPdf(fileName) {
    this.getPdfUploadInput().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  }

  toggleSubOffice() {
    this.getSubOfficeCheckbox().check({ force: true });
    cy.wait(1000);
    this.getSubOfficeCheckbox().uncheck({ force: true });
  }

  enterPublicationDate(date) {
    this.getPublicationDatePicker().clear().type(date);
  }

  enterArchiveDate(date) {
    this.getArchiveDatePicker().clear().type(date);
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

  deleteNews(title) {
    cy.contains('tr', title).find('button[aria-label="মুছুন"]').click();
    this.getConfirmButton().click();
  }

  clearSearch() {
    this.getClearSearchButton().click();
  }

  // Combined methods
  createNews(data) {
    this.navigateToNewsSection();
    this.clickNewNewsButton();
    this.enterTitleBn(data.title_bn);
    this.enterTitleEn(data.title_en);
    this.enterContentBn(data.content_bn);
    this.enterContentEn(data.content_en);
    this.uploadImage(data.imageFile);
    this.uploadPdf(data.pdfFile);
    this.toggleSubOffice();
    this.enterPublicationDate(data.publicationDate);
    this.enterArchiveDate(data.archiveDate);
    this.saveAndClose();
  }

  viewNews(data) {
    this.navigateToNewsSection();
    this.searchNews(data.searchTitle);
    this.clickView(data.searchTitle);
    this.getCancelButton().click();
  }

  editNews(data) {
    this.navigateToNewsSection();
    this.searchNews(data.searchTitle);
    this.clickEdit(data.searchTitle);
    this.enterTitleBn(data.title_bn);
    this.enterTitleEn(data.title_en);
    this.enterContentBn(data.content_bn);
    this.enterContentEn(data.content_en);
    this.uploadImage(data.imageFile);
    this.uploadPdf(data.pdfFile);
    this.editAndSave();
  }

  previewNews(data) {
    this.navigateToNewsSection();
    this.searchNews(data.searchTitle);
    this.clickPreview(data.searchTitle);
    cy.go('back');
  }

  toggleNewsStatus(data) {
    this.navigateToNewsSection();
    this.searchNews(data.searchTitle);
    this.toggleStatus(data.searchTitle);
    this.clearSearch();
  }

  deleteNewsRecord(data) {
    this.navigateToNewsSection();
    this.searchNews(data.searchTitle);
    this.deleteNews(data.searchTitle);
    this.clearSearch();
  }
}

export default NewsActions;