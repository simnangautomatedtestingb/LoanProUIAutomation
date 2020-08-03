import {LoginPage } from '../pages/LoginPage';
import { Given, Then } from 'cucumber';
import { browser} from 'protractor';
import * as LoginData from '../config/user.json';

const loginPage = new LoginPage();
var expect = require('chai').expect

Given(/^I navigate to application$/, async () => {
  await loginPage.OpenBrowser("https://beta-loanpro.simnang.com/client/app/login.html?");
});

Given(/^I log in using "([^"]*)" as "([^"]*)" user$/, async function(userType: string, user: string) {
  const userName = LoginData[userType][user].email;
  const password = LoginData[userType][user].password;

  await loginPage.setUserName(userName);
  await loginPage.setPassword(password);
  await loginPage.clickOnLoginBtn();
  //expect(browser.getCurrentUrl()).to.contains("https://beta-loanpro.simnang.com/client/app/index.php#/companies");
});

Then(/^I see the companies in the page$/, async () => {
  expect(browser.getCurrentUrl()).not("companies");
});

