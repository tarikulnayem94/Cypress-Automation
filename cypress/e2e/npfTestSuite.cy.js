import PageActions from '../../pageObjects/PageActions';
import BannerActions from '../../pageObjects/BannerActions';
import NewsActions from '../../pageObjects/NewsActions';

describe('NPF Automation Test Suite', () => {
  let testData;

  // Load JSON data once before all tests
  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  // Login and navigate to contents before each test
  beforeEach(() => {
    cy.npfLogin(testData.login);
    cy.visit(testData.login.baseUrl + '/contents');
  });

  /* ===================== Page Module ===========================*/

  it('Create a new page', () => {
    const pageActions = new PageActions();
    pageActions.createPage(testData.page.create);
  });

  // it('View an existing page', () => {
  //   const pageActions = new PageActions();
  //   pageActions.viewPage(testData.page.view);
  // });

  // it('Edit an existing page', () => {
  //   const pageActions = new PageActions();
  //   pageActions.editPage(testData.page.edit);
  // });

  // it('Preview an existing page', () => {
  //   const pageActions = new PageActions();
  //   pageActions.previewPage(testData.page.preview);
  // });

  // it('Active/Inactive an existing page', () => {
  //   const pageActions = new PageActions();
  //   pageActions.togglePageStatus(testData.page.toggle);
  // });

  // it('Delete an existing page', () => {
  //   const pageActions = new PageActions();
  //   pageActions.deletePageRecord(testData.page.delete);
  // });

  // /* Banner Module */
  // it('Create a new banner', () => {
  //   const bannerActions = new BannerActions();
  //   bannerActions.createBanner(testData.banner.create);
  // });

  // it('View an existing banner', () => {
  //   const bannerActions = new BannerActions();
  //   bannerActions.viewBanner(testData.banner.view);
  // });

  // it('Edit an existing banner', () => {
  //   const bannerActions = new BannerActions();
  //   bannerActions.editBanner(testData.banner.edit);
  // });

  // it('Active/Inactive an existing banner', () => {
  //   const bannerActions = new BannerActions();
  //   bannerActions.toggleBannerStatus(testData.banner.toggle);
  // });

  // it('Delete an existing banner', () => {
  //   const bannerActions = new BannerActions();
  //   bannerActions.deleteBannerRecord(testData.banner.delete);
  // });

  // /* News Module */
  // it('Create a new news', () => {
  //   const newsActions = new NewsActions();
  //   newsActions.createNews(testData.news.create);
  // });

  // it('View an existing news', () => {
  //   const newsActions = new NewsActions();
  //   newsActions.viewNews(testData.news.view);
  // });

  // it('Edit an existing news', () => {
  //   const newsActions = new NewsActions();
  //   newsActions.editNews(testData.news.edit);
  // });

  // it('Preview an existing news', () => {
  //   const newsActions = new NewsActions();
  //   newsActions.previewNews(testData.news.preview);
  // });

  // it('Active/Inactive an existing news', () => {
  //   const newsActions = new NewsActions();
  //   newsActions.toggleNewsStatus(testData.news.toggle);
  // });

  // it('Delete an existing news', () => {
  //   const newsActions = new NewsActions();
  //   newsActions.deleteNewsRecord(testData.news.delete);
  // });

});