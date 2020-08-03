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
const LoginPage_1 = require("../pages/LoginPage");
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
const LoginData = require("../config/user.json");
const loginPage = new LoginPage_1.LoginPage();
var expect = require('chai').expect;
cucumber_1.Given(/^I navigate to application$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield loginPage.OpenBrowser("https://beta-loanpro.simnang.com/client/app/login.html?");
}));
cucumber_1.Given(/^I log in using "([^"]*)" as "([^"]*)" user$/, function (userType, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userName = LoginData[userType][user].email;
        const password = LoginData[userType][user].password;
        yield loginPage.setUserName(userName);
        yield loginPage.setPassword(password);
        yield loginPage.clickOnLoginBtn();
        //expect(browser.getCurrentUrl()).to.contains("https://beta-loanpro.simnang.com/client/app/index.php#/companies");
    });
});
cucumber_1.Then(/^I see the companies in the page$/, () => __awaiter(void 0, void 0, void 0, function* () {
    expect(protractor_1.browser.getCurrentUrl()).not("companies");
}));
//# sourceMappingURL=LoginSteps.js.map