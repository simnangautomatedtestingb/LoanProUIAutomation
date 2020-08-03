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
exports.LoginPage = void 0;
const protractor_1 = require("protractor");
const BasePage_1 = require("./BasePage");
class LoginPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        //Locators de elementos solo de lectura
        this.emailFieldLocator = protractor_1.by.id('username');
        this.passFieldLocator = protractor_1.by.id('password');
        this.loginBtnLocator = protractor_1.by.xpath("//button[contains(text(),'Login')]");
        this.clearBtnLocator = protractor_1.by.xpath("//*[@title='Clear']");
    }
    //Metodos para esos locators
    //Open browser
    OpenBrowser(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.navigateTo(url);
        });
    }
    setUserName(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForElementPresence(this.emailFieldLocator);
            yield this.sendKeys(this.emailFieldLocator, user);
        });
    }
    userNameExist() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.expectElementIsPresent(this.emailFieldLocator);
        });
    }
    setPassword(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForElementPresence(this.passFieldLocator);
            yield this.sendKeys(this.passFieldLocator, pass);
        });
    }
    clickOnLoginBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForElementToBeClickable(this.loginBtnLocator);
            yield this.clickButton(this.loginBtnLocator);
            yield this.pause(10000);
        });
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map