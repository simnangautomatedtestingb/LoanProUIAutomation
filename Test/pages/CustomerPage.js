"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerPage = void 0;
const protractor_1 = require("protractor");
const LoginPage_1 = require("./LoginPage");
class CustomerPage extends LoginPage_1.LoginPage {
    constructor() {
        super(...arguments);
        //Locators de elementos solo de lectura
        this.mainMenuDropLocator = "//button[@title='Open main navigation']";
        this.userMenuLocator = "//li[@data-page-id='users']";
        this.customerManagerLocator = "//*[contains(text(),'Customer Manager')]";
        this.customerTenantLocator = "//tr[@role='button']//td[contains(text(),'Smoke')]";
        this.newCustomerBtnLocator = "//a[@title='New Customer']";
        this.newCustomerFNameLocator = "//input[@name='firstname']";
        this.newCustomerLNameLocator = "//input[@name='lastname']";
        this.nextButtonLocator = "//button[contains(text(), 'Next')]";
        this.addresLocator = "//input[@name='address1']";
        this.zipCodeLocator = "//input[@name='zipcode']";
        this.userNameLocator = "//input[@placeholder='email or other username']";
        this.userPassLocator = "//input[@placeholder='password']";
        this.userMailCheckLocator = "//*[@aria-label='Set mailing address from primary address']";
        this.userSaveBtnLocator = "//button[contains(text(), 'Save')]";
        this.customerSearchInputLocator = "//input[@placeholder='Search by keyword']";
        this.customerSearchBtnLocator = "//md-icon[contains(text(), 'search')]";
        this.customerResultLocator = "(//td[contains(text(), 'Test Automation')])[1]";
        this.customerEditBtnLocator = "//button[contains(text(), 'Edit')]";
        this.userOptionMenu = "//div[@aria-label='Open user options']";
        this.logoutOptionLocator = "//button[@ng-click='signOut()']";
        this.booleanRespose = true;
    }
    //Metodos para esos locators
    //Open browser
    openCustomersPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.mainMenuDropLocator)).click();
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.userMenuLocator)).click();
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.customerManagerLocator)).click();
            yield this.pause(10000);
        });
    }
    openTenant(user, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setUserName(user);
            yield this.setPassword(pass);
            yield this.pause(1000);
            yield this.clickOnLoginBtn();
            yield this.pause(1000);
            yield protractor_1.element(protractor_1.by.xpath(this.customerTenantLocator)).click();
            yield this.pause(10000);
        });
    }
    clickNewCostumer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.newCustomerBtnLocator)).click();
            yield this.pause(10000);
        });
    }
    createNewCostumer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.element(protractor_1.by.xpath(this.newCustomerFNameLocator)).sendKeys("Test");
            yield protractor_1.element(protractor_1.by.xpath(this.newCustomerLNameLocator)).sendKeys("Automation");
            yield protractor_1.element(protractor_1.by.xpath(this.nextButtonLocator)).click();
            yield protractor_1.element(protractor_1.by.xpath(this.addresLocator)).sendKeys("grove");
            yield protractor_1.element(protractor_1.by.xpath(this.zipCodeLocator)).sendKeys("90201");
            yield protractor_1.element(protractor_1.by.xpath(this.addresLocator)).sendKeys("s");
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.nextButtonLocator)).click();
            yield this.pause(1000);
            yield protractor_1.element(protractor_1.by.xpath(this.userMailCheckLocator)).click();
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.nextButtonLocator)).click();
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.userNameLocator)).sendKeys("test@test.com");
            yield protractor_1.element(protractor_1.by.xpath(this.nextButtonLocator)).click();
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.userSaveBtnLocator)).click();
            yield this.pause(10000);
        });
    }
    verifyUserCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            var expect = require('chai').expect;
            yield this.pause(10000);
            yield expect(protractor_1.element(protractor_1.by.xpath("//div[contains(text(), 'Test Automation')]")).isPresent());
        });
    }
    searchUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.customerSearchInputLocator)).sendKeys("Test Automation");
            yield protractor_1.element(protractor_1.by.xpath(this.customerSearchBtnLocator)).click();
            yield this.pause(10000);
        });
    }
    selectUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.customerResultLocator)).click();
            yield this.pause(10000);
        });
    }
    clickEditBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pause(10000);
            yield protractor_1.element(protractor_1.by.xpath(this.customerEditBtnLocator)).click();
            yield this.pause(10000);
        });
    }
    verifyUserEdition() {
        return __awaiter(this, void 0, void 0, function* () {
            var expect = require('chai').expect;
            yield this.pause(10000);
            yield expect(protractor_1.element(protractor_1.by.xpath("//div[contains(text(), 'Testing Automation')]")).isPresent());
        });
    }
    editCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.element(protractor_1.by.xpath(this.newCustomerFNameLocator)).sendKeys("ing");
            yield protractor_1.element(protractor_1.by.xpath(this.userSaveBtnLocator)).click();
            yield this.pause(10000);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.element(protractor_1.by.xpath(this.userOptionMenu)).click();
            yield this.pause(1000);
            yield protractor_1.element(protractor_1.by.xpath(this.logoutOptionLocator)).click();
            yield this.pause(1000);
        });
    }
}
exports.CustomerPage = CustomerPage;
//# sourceMappingURL=CustomerPage.js.map