class BannerActions {
  // Selectors
  getBannerSection() {
    return cy.contains('h5', 'ব্যানার');
  }

  getNewBannerButton() {
    return cy.contains('button', 'নতুন টপ ব্যানার');
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
    return cy.get('input[type="file"][accept="image/*"]');
  }

  getSortOrderInput() {
    return cy.get('input[name="sort_order"]');
  }

  getPdfUploadBnInput() {
    return cy.get('input[type="file"][accept="application/pdf"]').eq(0);
  }

  getPdfUploadEnInput() {
    return cy.get('input[type="file"][accept="application/pdf"]').eq(1);
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
  navigateToBannerSection() {
    this.getBannerSection().click();
  }

  clickNewBannerButton() {
    this.getNewBannerButton().click();
  }

  searchBanner(title) {
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

  enterSortOrder(order) {
    this.getSortOrderInput().clear().type(order);
  }

  uploadPdfBn(fileName) {
    this.getPdfUploadBnInput().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  }

  uploadPdfEn(fileName) {
    this.getPdfUploadEnInput().selectFile(`cypress/fixtures/${fileName}`, { force: true });
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

  toggleStatus(title) {
    cy.contains('tr', title).find('.MuiSwitch-input').click({ force: true });
    this.getConfirmButton().click();
  }

  deleteBanner(title) {
    cy.contains('tr', title).find('button[aria-label="মুছুন"]').click();
    this.getConfirmButton().click();
  }

  clearSearch() {
    this.getClearSearchButton().click();
  }

  // Combined methods
  createBanner(data) {
    this.navigateToBannerSection();
    this.clickNewBannerButton();
    this.enterTitleBn(data.title_bn);
    this.enterTitleEn(data.title_en);
    this.enterContentBn(data.content_bn);
    this.enterContentEn(data.content_en);
    this.uploadImage(data.imageFile);
    this.enterSortOrder(data.sortOrder);
    this.saveAndClose();
  }

  viewBanner(data) {
    this.navigateToBannerSection();
    this.searchBanner(data.searchTitle);
    this.clickView(data.searchTitle);
    this.getCancelButton().should('be.visible');
  }

  editBanner(data) {
    this.navigateToBannerSection();
    this.searchBanner(data.searchTitle);
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

  toggleBannerStatus(data) {
    this.navigateToBannerSection();
    this.searchBanner(data.searchTitle);
    this.toggleStatus(data.searchTitle);
    this.clearSearch();
  }

  deleteBannerRecord(data) {
    this.navigateToBannerSection();
    this.searchBanner(data.searchTitle);
    this.deleteBanner(data.searchTitle);
    this.clearSearch();
  }
}

export default BannerActions;