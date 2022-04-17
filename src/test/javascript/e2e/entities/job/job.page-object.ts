import { element, by, ElementFinder } from 'protractor';

export class JobComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-job div table .btn-danger'));
  title = element.all(by.css('jhi-job div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class JobUpdatePage {
  pageTitle = element(by.id('jhi-job-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  jobTitleInput = element(by.id('field_jobTitle'));
  minSalaryInput = element(by.id('field_minSalary'));
  maxSalaryInput = element(by.id('field_maxSalary'));

  taskSelect = element(by.id('field_task'));
  employeeSelect = element(by.id('field_employee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setJobTitleInput(jobTitle: string): Promise<void> {
    await this.jobTitleInput.sendKeys(jobTitle);
  }

  async getJobTitleInput(): Promise<string> {
    return await this.jobTitleInput.getAttribute('value');
  }

  async setMinSalaryInput(minSalary: string): Promise<void> {
    await this.minSalaryInput.sendKeys(minSalary);
  }

  async getMinSalaryInput(): Promise<string> {
    return await this.minSalaryInput.getAttribute('value');
  }

  async setMaxSalaryInput(maxSalary: string): Promise<void> {
    await this.maxSalaryInput.sendKeys(maxSalary);
  }

  async getMaxSalaryInput(): Promise<string> {
    return await this.maxSalaryInput.getAttribute('value');
  }

  async taskSelectLastOption(): Promise<void> {
    await this.taskSelect.all(by.tagName('option')).last().click();
  }

  async taskSelectOption(option: string): Promise<void> {
    await this.taskSelect.sendKeys(option);
  }

  getTaskSelect(): ElementFinder {
    return this.taskSelect;
  }

  async getTaskSelectedOption(): Promise<string> {
    return await this.taskSelect.element(by.css('option:checked')).getText();
  }

  async employeeSelectLastOption(): Promise<void> {
    await this.employeeSelect.all(by.tagName('option')).last().click();
  }

  async employeeSelectOption(option: string): Promise<void> {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect(): ElementFinder {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption(): Promise<string> {
    return await this.employeeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class JobDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-job-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-job'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
