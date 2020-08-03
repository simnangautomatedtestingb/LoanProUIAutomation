import { browser, element, by, protractor, $$, $, ElementFinder, Locator } from 'protractor';
import { inspect } from 'util';
import * as fs from 'fs';
import * as path from 'path';
  
export class BasePage {
    private POLL_INTERVAL_MILLIS: number = 20000;
    private TIMEOUT_MILLIS = 30000;
    private SHORT_TIMEOUT_MILLIS = 50000;
  
    public async waitForElementPresence(elementLocator: Locator) {
      let ele = await element(elementLocator);
      let until = await protractor.ExpectedConditions;
      await browser.wait(
        until.presenceOf(ele),
        this.TIMEOUT_MILLIS,
        'Element taking too long to appear in the DOM'
      );
    }
    
    public async selectDropdownOptionByText(
      dropdownLocator: Locator,
      option: string
    ) {
      await this.clickElement(dropdownLocator);
      let optionLocator = await by.xpath(
        "//option[contains(text(),'" + option + "')]"
      );
      await this.clickElement(optionLocator);
    }
  
    public async waitForElementToBeClickable(elementLocator: Locator) {
      let ele = await element(elementLocator);
      let until = await protractor.ExpectedConditions;
      await browser.wait(until.presenceOf(ele), this.TIMEOUT_MILLIS);
    }
  
    public async waitForElementDisappears(elementLocator: Locator) {
      let ele = await element(elementLocator);
      let until = await protractor.ExpectedConditions;
      await browser.wait(until.not(until.visibilityOf(ele)));
    }
  
    //Utils
    public async selectDropdownVisibleText(
      elementLocator: Locator,
      text: string
    ) {
      let ele = await element(elementLocator);
      await ele.click();
      await ele
        .element(by.xpath("//option[contains(text(),'" + text + "')]"))
        .click();
    }
  
    public async selectDropdownValue(elementLocator: Locator, index: string) {
      const ele = await element(elementLocator);
      await ele.click();
      await ele.element(by.xpath('//option[' + index + ']')).click();
    }
  
    public async clickElement(elementLocator: Locator) {
      const elem: ElementFinder = await element(elementLocator);
      await this.clickElementFinder(elem);
      return true;
    }
  
    public async clickElementFinder(elementToClick: ElementFinder) {
      let classContext = this;
      this.waitForElementPresence(elementToClick);
      await browser.wait(
        async function() {
          try {
            await classContext.pause(500); // Protractor and JS Webdriver bindings do not allow for customized polling
            await elementToClick.click();
            return true;
          } catch (error) {
            console.log('Error on click: ' + error);
            return false;
          }
        },
        this.TIMEOUT_MILLIS,
        'Clicking of element failed: ' + inspect(elementToClick)
      );
    }
  
    public async sendKeys(elementLocator: Locator, keys) {
      const elem: ElementFinder = await element(elementLocator);
      await this.sendKeysWithElementFinder(elem, keys);
    }

    public async clickButton(elementLocator: Locator){
      const elem: ElementFinder = await element(elementLocator)
      await elem.click();
    }

    public async expectElementIsPresent(elementLocator: Locator){
      return element(elementLocator).isPresent();
    }
  
    public async sendKeysWithElementFinder(elem: ElementFinder, keys) {
      await this.waitForElementPrecenseShort(elem);
      await elem.clear();
      await elem.sendKeys(keys);
      return (await elem.getAttribute('value')) === keys;
    }
  
    public async waitForElementPrecenseShort(elem: ElementFinder) {
      const EC = protractor.ExpectedConditions;
      try {
        await browser.wait(EC.presenceOf(elem),this.SHORT_TIMEOUT_MILLIS);
      } catch (error) {
        throw error;
      }
    }
  
    public async getElementText(elementLocator: Locator): Promise<string> {
      return new Promise<string>(async (resolve, reject) => {
        await element(elementLocator)
          .getText()
          .then(async function(text: string) {
            await resolve(text);
          });
      });
    }
  
    public async countElementsLocator(elementLocator: Locator): Promise<string> {
      return new Promise<string>(async (resolve, reject) => {
        await this.waitForElementPresence(elementLocator);
        await element(elementLocator)
          .getText()
          .then(function(text: string) {
            resolve(text);
          });
      });
    }
  
    public async countElements(elementLocator: Locator): Promise<number> {
      return new Promise<number>(async (resolve, reject) => {
        await element
          .all(elementLocator)
          .count()
          .then(function(count: number) {
            resolve(count);
          });
      });
    }
  
    public async getElementAttribute(
      elementLocator: Locator,
      attribute: string
    ): Promise<string> {
      await this.waitForElementPresence(elementLocator);
      return new Promise<string>(async (resolve, reject) => {
        let ele = await element(elementLocator)
          .getAttribute(attribute)
          .then(async function f(attr) {
            resolve(attr);
          });
      });
    }
  
    public async waitPageLoad() {
      let i = 0;
      while (i <= 50) {
        try {
          await browser.driver
            .executeScript('return document.readyState')
            .then(async function f(comp) {
              if (comp === 'complete') {
                return;
              }
            });
        } catch (e) {
          i++;
          await this.pause(100);
          if (i === 5) {
            console.log('The page is taking too long for load');
            break;
          }
        }
      }
    }
  
    public async clickCheckbox(elementLocator: Locator, isSelected: boolean) {
      let selectCheck = await element(elementLocator).isSelected();
      if (isSelected !== selectCheck) {
        await element(elementLocator).click();
      }
    }
  
    public async pause(millisecondsToSleep: number) {
      return await new Promise(resolve =>
        setTimeout(resolve, millisecondsToSleep)
      );
    }
    // Other helpers
  
    /**
     * This method checks if the page is angular or non-angular and configure it for non-angular pages
     */
    public async navigateTo(pageURL: string) {
      await browser.driver
        .manage()
        .window()
        .maximize();
      await browser.driver.get(pageURL);
      await browser
        .executeScript('return !!(window.angular || window.ng);')
        .then(async function(isAngular) {
          if (!isAngular) {
            await browser.waitForAngularEnabled(false);
          }
        });
    }
  
    public async getTextFromOneElementInAnElementList(
      elementLocator: Locator,
      index: number
    ): Promise<string> {
      return new Promise<string>(async (resolve, reject) => {
        await element
          .all(elementLocator)
          .get(index)
          .getText()
          .then(function(text: string) {
            resolve(text);
          });
      });
    }
  
    
    public async switchToFrame(frameLocator: Locator) {
      await browser.switchTo().defaultContent();
      await browser.switchTo().frame(element(frameLocator).getWebElement());
    }
  
    public async switchToSubFrame(frameLocator: Locator) {
      await browser.switchTo().frame(element(frameLocator).getWebElement());
    }
  
  }