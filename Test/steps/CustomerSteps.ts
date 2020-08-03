import {LoginPage } from '../pages/LoginPage';
import { Given, Then } from 'cucumber';
import { browser} from 'protractor';
import * as LoginData from '../config/user.json';
import { CustomerPage } from '../pages/CustomerPage';

const loginPage = new LoginPage();
const customerPage = new CustomerPage();
var expect = require('chai').expect

Given(/^I enter to the aplication$/, async () => {
  await loginPage.OpenBrowser("https://beta-loanpro.simnang.com/client/app/login.html?");
});



Given(/^I navigate to Customer manager page$/, async () => {
    const userName = LoginData["loanpro_users"]["user"].email;
    const password = LoginData["loanpro_users"]["user"].password;
    const usEvn = LoginData["loanpro_users"]["user"].env;
    await customerPage.openTenant(userName, password);   
    await customerPage.openCustomersPage();
});

Given(/^I click on new customer$/, async () => {  
    await customerPage.clickNewCostumer();
});

Given(/^I Send the information for new customer$/, async () => {  
    await customerPage.createNewCostumer();
});

Then(/^I see the new customer$/, async () => {  
    await customerPage.verifyUserCreation();
    await customerPage.logout();
});

Given(/^I search a customer$/, async () => {  
    await customerPage.searchUser();
});

Given(/^I Click on the customer$/, async () => {  
    await customerPage.selectUser();
});

Given(/^I Click on the edit button$/, async () => {  
    await customerPage.clickEditBtn();
});

Given(/^I edit the customer information$/, async () => {  
    await customerPage.editCustomer();
});

Then(/^I see the customer edited$/, async () => {  
    await customerPage.verifyUserEdition();
    await customerPage.logout();
});
