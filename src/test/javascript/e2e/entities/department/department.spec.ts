import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DepartmentComponentsPage, DepartmentDeleteDialog, DepartmentUpdatePage } from './department.page-object';

const expect = chai.expect;

describe('Department e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departmentComponentsPage: DepartmentComponentsPage;
  let departmentUpdatePage: DepartmentUpdatePage;
  let departmentDeleteDialog: DepartmentDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Departments', async () => {
    await navBarPage.goToEntity('department');
    departmentComponentsPage = new DepartmentComponentsPage();
    await browser.wait(ec.visibilityOf(departmentComponentsPage.title), 5000);
    expect(await departmentComponentsPage.getTitle()).to.eq('backEndManagerApp.department.home.title');
    await browser.wait(ec.or(ec.visibilityOf(departmentComponentsPage.entities), ec.visibilityOf(departmentComponentsPage.noResult)), 1000);
  });

  it('should load create Department page', async () => {
    await departmentComponentsPage.clickOnCreateButton();
    departmentUpdatePage = new DepartmentUpdatePage();
    expect(await departmentUpdatePage.getPageTitle()).to.eq('backEndManagerApp.department.home.createOrEditLabel');
    await departmentUpdatePage.cancel();
  });

  it('should create and save Departments', async () => {
    const nbButtonsBeforeCreate = await departmentComponentsPage.countDeleteButtons();

    await departmentComponentsPage.clickOnCreateButton();

    await promise.all([departmentUpdatePage.setDepartmentNameInput('departmentName'), departmentUpdatePage.locationSelectLastOption()]);

    await departmentUpdatePage.save();
    expect(await departmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await departmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Department', async () => {
    const nbButtonsBeforeDelete = await departmentComponentsPage.countDeleteButtons();
    await departmentComponentsPage.clickOnLastDeleteButton();

    departmentDeleteDialog = new DepartmentDeleteDialog();
    expect(await departmentDeleteDialog.getDialogTitle()).to.eq('backEndManagerApp.department.delete.question');
    await departmentDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(departmentComponentsPage.title), 5000);

    expect(await departmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
