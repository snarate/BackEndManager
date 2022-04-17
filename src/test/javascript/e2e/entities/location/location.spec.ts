import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocationComponentsPage, LocationDeleteDialog, LocationUpdatePage } from './location.page-object';

const expect = chai.expect;

describe('Location e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let locationComponentsPage: LocationComponentsPage;
  let locationUpdatePage: LocationUpdatePage;
  let locationDeleteDialog: LocationDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Locations', async () => {
    await navBarPage.goToEntity('location');
    locationComponentsPage = new LocationComponentsPage();
    await browser.wait(ec.visibilityOf(locationComponentsPage.title), 5000);
    expect(await locationComponentsPage.getTitle()).to.eq('backEndManagerApp.location.home.title');
    await browser.wait(ec.or(ec.visibilityOf(locationComponentsPage.entities), ec.visibilityOf(locationComponentsPage.noResult)), 1000);
  });

  it('should load create Location page', async () => {
    await locationComponentsPage.clickOnCreateButton();
    locationUpdatePage = new LocationUpdatePage();
    expect(await locationUpdatePage.getPageTitle()).to.eq('backEndManagerApp.location.home.createOrEditLabel');
    await locationUpdatePage.cancel();
  });

  it('should create and save Locations', async () => {
    const nbButtonsBeforeCreate = await locationComponentsPage.countDeleteButtons();

    await locationComponentsPage.clickOnCreateButton();

    await promise.all([
      locationUpdatePage.setStreetAddressInput('streetAddress'),
      locationUpdatePage.setPostalCodeInput('postalCode'),
      locationUpdatePage.setCityInput('city'),
      locationUpdatePage.setStateProvinceInput('stateProvince'),
      locationUpdatePage.countrySelectLastOption(),
    ]);

    await locationUpdatePage.save();
    expect(await locationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Location', async () => {
    const nbButtonsBeforeDelete = await locationComponentsPage.countDeleteButtons();
    await locationComponentsPage.clickOnLastDeleteButton();

    locationDeleteDialog = new LocationDeleteDialog();
    expect(await locationDeleteDialog.getDialogTitle()).to.eq('backEndManagerApp.location.delete.question');
    await locationDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(locationComponentsPage.title), 5000);

    expect(await locationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
