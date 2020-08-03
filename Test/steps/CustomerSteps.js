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
const LoginData = require("../config/user.json");
const CustomerPage_1 = require("../pages/CustomerPage");
const loginPage = new LoginPage_1.LoginPage();
const customerPage = new CustomerPage_1.CustomerPage();
var expect = require('chai').expect;
cucumber_1.Given(/^I enter to the aplication$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield loginPage.OpenBrowser("https://beta-loanpro.simnang.com/client/app/login.html?");
}));
cucumber_1.Given(/^I navigate to Customer manager page$/, () => __awaiter(void 0, void 0, void 0, function* () {
    const userName = LoginData["loanpro_users"]["user"].email;
    const password = LoginData["loanpro_users"]["user"].password;
    const usEvn = LoginData["loanpro_users"]["user"].env;
    yield customerPage.openTenant(userName, password);
    yield customerPage.openCustomersPage();
}));
cucumber_1.Given(/^I click on new customer$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.clickNewCostumer();
}));
cucumber_1.Given(/^I Send the information for new customer$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.createNewCostumer();
}));
cucumber_1.Then(/^I see the new customer$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.verifyUserCreation();
    yield customerPage.logout();
}));
cucumber_1.Given(/^I search a customer$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.searchUser();
}));
cucumber_1.Given(/^I Click on the customer$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.selectUser();
}));
cucumber_1.Given(/^I Click on the edit button$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.clickEditBtn();
}));
cucumber_1.Given(/^I edit the customer information$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.editCustomer();
}));
cucumber_1.Then(/^I see the customer edited$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield customerPage.verifyUserEdition();
    yield customerPage.logout();
}));
//# sourceMappingURL=CustomerSteps.js.map