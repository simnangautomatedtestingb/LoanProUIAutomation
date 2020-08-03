import { browser, Locator, element, by, protractor, $$, $ } from 'protractor';
import { BasePage } from './BasePage';
import { FlexibleLocator } from 'blue-harvest/dist/action_helpers/locator_types';
import { click, type, inside } from 'blue-harvest';

export class LoginPage extends BasePage {
    //Locators de elementos solo de lectura
  public readonly emailFieldLocator: Locator =  by.id('username');
  public readonly passFieldLocator: Locator = by.id('password');
  public readonly loginBtnLocator: Locator = by.xpath("//button[contains(text(),'Login')]");
  public readonly clearBtnLocator: Locator = by.xpath("//*[@title='Clear']")

  //Metodos para esos locators
   //Open browser
  async OpenBrowser(url: string) {
    await this.navigateTo(url);
  }

  public async setUserName(user: string) {
    await this.waitForElementPresence(this.emailFieldLocator);
    await this.sendKeys(this.emailFieldLocator, user);
  }

  public async userNameExist() {
    return this.expectElementIsPresent(this.emailFieldLocator);
  }

  public async setPassword(pass: string) {
    await this.waitForElementPresence(this.passFieldLocator);
    await this.sendKeys(this.passFieldLocator, pass);
  }

  public async clickOnLoginBtn() {
    await this.waitForElementToBeClickable(this.loginBtnLocator);
    await this.clickButton(this.loginBtnLocator);
    await this.pause(10000);
  }
}
