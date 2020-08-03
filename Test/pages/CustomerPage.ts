import { browser, Locator, element, by, protractor, $$, $, promise } from 'protractor';
import { BasePage } from './BasePage';
import { FlexibleLocator } from 'blue-harvest/dist/action_helpers/locator_types';
import { click, type, inside } from 'blue-harvest';
import { LoginPage } from './LoginPage';

export class CustomerPage extends LoginPage {
    //Locators de elementos solo de lectura
  public mainMenuDropLocator: string = "//button[@title='Open main navigation']";
  public userMenuLocator: string = "//li[@data-page-id='users']";
  public customerManagerLocator: string = "//*[contains(text(),'Customer Manager')]";
  public customerTenantLocator: string = "//tr[@role='button']//td[contains(text(),'Smoke')]";
  public newCustomerBtnLocator: string = "//a[@title='New Customer']";
  public newCustomerFNameLocator: string = "//input[@name='firstname']";
  public newCustomerLNameLocator: string = "//input[@name='lastname']";
  public nextButtonLocator: string = "//button[contains(text(), 'Next')]";
  public addresLocator: string = "//input[@name='address1']";
  public zipCodeLocator: string = "//input[@name='zipcode']";
  public userNameLocator: string = "//input[@placeholder='email or other username']";
  public userPassLocator: string = "//input[@placeholder='password']";
  public userMailCheckLocator: string = "//*[@aria-label='Set mailing address from primary address']";
  public userSaveBtnLocator: string = "//button[contains(text(), 'Save')]"
  public customerSearchInputLocator: string = "//input[@placeholder='Search by keyword']";
  public customerSearchBtnLocator: string = "//md-icon[contains(text(), 'search')]";
  public customerResultLocator: string = "(//td[contains(text(), 'Test Automation')])[1]";
  public customerEditBtnLocator: string = "//button[contains(text(), 'Edit')]";
  public userOptionMenu: string = "//div[@aria-label='Open user options']";
  public logoutOptionLocator: string = "//button[@ng-click='signOut()']";
  public booleanRespose: boolean = true;

  //Metodos para esos locators
   //Open browser
  async openCustomersPage() {
    await this.pause(10000);
    await element(by.xpath(this.mainMenuDropLocator)).click();
    await this.pause(10000);
    await element(by.xpath(this.userMenuLocator)).click();
    await this.pause(10000);
    await element(by.xpath(this.customerManagerLocator)).click();
    await this.pause(10000);
  }


  async openTenant(user: string, pass: string){

  
    await this.setUserName(user);
    await this.setPassword(pass);
    await this.pause(1000);
    await this.clickOnLoginBtn();
    await this.pause(1000);
    await element(by.xpath(this.customerTenantLocator)).click();
    await this.pause(10000);

  }

  async clickNewCostumer(){
    await this.pause(10000);
    await element(by.xpath(this.newCustomerBtnLocator)).click();
    await this.pause(10000);
  }
  async createNewCostumer(){
    await element(by.xpath(this.newCustomerFNameLocator)).sendKeys("Test");
    await element(by.xpath(this.newCustomerLNameLocator)).sendKeys("Automation");
    await element(by.xpath(this.nextButtonLocator)).click();
    await element(by.xpath(this.addresLocator)).sendKeys("grove");
    await element(by.xpath(this.zipCodeLocator)).sendKeys("90201");
    await element(by.xpath(this.addresLocator)).sendKeys("s");
    await this.pause(10000);
    await element(by.xpath(this.nextButtonLocator)).click();
    await this.pause(1000);
    await element(by.xpath(this.userMailCheckLocator)).click();
    await this.pause(10000);
    await element(by.xpath(this.nextButtonLocator)).click();
    await this.pause(10000);
    await element(by.xpath(this.userNameLocator)).sendKeys("test@test.com");
    await element(by.xpath(this.nextButtonLocator)).click();
    await this.pause(10000);
    await element(by.xpath(this.userSaveBtnLocator)).click();
    await this.pause(10000);
  }
  async verifyUserCreation(){
    var expect = require('chai').expect
    await this.pause(10000);
    await expect(element(by.xpath("//div[contains(text(), 'Test Automation')]")).isPresent());
  }

  async searchUser(){
    await this.pause(10000);
    await element(by.xpath(this.customerSearchInputLocator)).sendKeys("Test Automation");
    await element(by.xpath(this.customerSearchBtnLocator)).click();
    await this.pause(10000);
  }

  async selectUser(){
    await this.pause(10000);
    await element(by.xpath(this.customerResultLocator)).click();
    await this.pause(10000);
  }

  async clickEditBtn(){
    await this.pause(10000);
    await element(by.xpath(this.customerEditBtnLocator)).click();
    await this.pause(10000);
  }

  async verifyUserEdition(){
      var expect = require('chai').expect
      await this.pause(10000);
      await expect(element(by.xpath("//div[contains(text(), 'Testing Automation')]")).isPresent());
  }

  async editCustomer(){
    await element(by.xpath(this.newCustomerFNameLocator)).sendKeys("ing");
    await element(by.xpath(this.userSaveBtnLocator)).click();
    await this.pause(10000);
  }

  async logout(){
    await element(by.xpath(this.userOptionMenu)).click();
    await this.pause(1000);
    await element(by.xpath(this.logoutOptionLocator)).click();
    await this.pause(1000);
  }

}

