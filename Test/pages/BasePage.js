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
exports.BasePage = void 0;
const protractor_1 = require("protractor");
const util_1 = require("util");
class BasePage {
    constructor() {
        this.POLL_INTERVAL_MILLIS = 20000;
        this.TIMEOUT_MILLIS = 30000;
        this.SHORT_TIMEOUT_MILLIS = 50000;
    }
    waitForElementPresence(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            let ele = yield protractor_1.element(elementLocator);
            let until = yield protractor_1.protractor.ExpectedConditions;
            yield protractor_1.browser.wait(until.presenceOf(ele), this.TIMEOUT_MILLIS, 'Element taking too long to appear in the DOM');
        });
    }
    selectDropdownOptionByText(dropdownLocator, option) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clickElement(dropdownLocator);
            let optionLocator = yield protractor_1.by.xpath("//option[contains(text(),'" + option + "')]");
            yield this.clickElement(optionLocator);
        });
    }
    waitForElementToBeClickable(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            let ele = yield protractor_1.element(elementLocator);
            let until = yield protractor_1.protractor.ExpectedConditions;
            yield protractor_1.browser.wait(until.presenceOf(ele), this.TIMEOUT_MILLIS);
        });
    }
    waitForElementDisappears(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            let ele = yield protractor_1.element(elementLocator);
            let until = yield protractor_1.protractor.ExpectedConditions;
            yield protractor_1.browser.wait(until.not(until.visibilityOf(ele)));
        });
    }
    //Utils
    selectDropdownVisibleText(elementLocator, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let ele = yield protractor_1.element(elementLocator);
            yield ele.click();
            yield ele
                .element(protractor_1.by.xpath("//option[contains(text(),'" + text + "')]"))
                .click();
        });
    }
    selectDropdownValue(elementLocator, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const ele = yield protractor_1.element(elementLocator);
            yield ele.click();
            yield ele.element(protractor_1.by.xpath('//option[' + index + ']')).click();
        });
    }
    clickElement(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = yield protractor_1.element(elementLocator);
            yield this.clickElementFinder(elem);
            return true;
        });
    }
    clickElementFinder(elementToClick) {
        return __awaiter(this, void 0, void 0, function* () {
            let classContext = this;
            this.waitForElementPresence(elementToClick);
            yield protractor_1.browser.wait(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield classContext.pause(500); // Protractor and JS Webdriver bindings do not allow for customized polling
                        yield elementToClick.click();
                        return true;
                    }
                    catch (error) {
                        console.log('Error on click: ' + error);
                        return false;
                    }
                });
            }, this.TIMEOUT_MILLIS, 'Clicking of element failed: ' + util_1.inspect(elementToClick));
        });
    }
    sendKeys(elementLocator, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = yield protractor_1.element(elementLocator);
            yield this.sendKeysWithElementFinder(elem, keys);
        });
    }
    clickButton(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            const elem = yield protractor_1.element(elementLocator);
            yield elem.click();
        });
    }
    expectElementIsPresent(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            return protractor_1.element(elementLocator).isPresent();
        });
    }
    sendKeysWithElementFinder(elem, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForElementPrecenseShort(elem);
            yield elem.clear();
            yield elem.sendKeys(keys);
            return (yield elem.getAttribute('value')) === keys;
        });
    }
    waitForElementPrecenseShort(elem) {
        return __awaiter(this, void 0, void 0, function* () {
            const EC = protractor_1.protractor.ExpectedConditions;
            try {
                yield protractor_1.browser.wait(EC.presenceOf(elem), this.SHORT_TIMEOUT_MILLIS);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getElementText(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield protractor_1.element(elementLocator)
                    .getText()
                    .then(function (text) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield resolve(text);
                    });
                });
            }));
        });
    }
    countElementsLocator(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.waitForElementPresence(elementLocator);
                yield protractor_1.element(elementLocator)
                    .getText()
                    .then(function (text) {
                    resolve(text);
                });
            }));
        });
    }
    countElements(elementLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield protractor_1.element
                    .all(elementLocator)
                    .count()
                    .then(function (count) {
                    resolve(count);
                });
            }));
        });
    }
    getElementAttribute(elementLocator, attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForElementPresence(elementLocator);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let ele = yield protractor_1.element(elementLocator)
                    .getAttribute(attribute)
                    .then(function f(attr) {
                    return __awaiter(this, void 0, void 0, function* () {
                        resolve(attr);
                    });
                });
            }));
        });
    }
    waitPageLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            while (i <= 50) {
                try {
                    yield protractor_1.browser.driver
                        .executeScript('return document.readyState')
                        .then(function f(comp) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (comp === 'complete') {
                                return;
                            }
                        });
                    });
                }
                catch (e) {
                    i++;
                    yield this.pause(100);
                    if (i === 5) {
                        console.log('The page is taking too long for load');
                        break;
                    }
                }
            }
        });
    }
    clickCheckbox(elementLocator, isSelected) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectCheck = yield protractor_1.element(elementLocator).isSelected();
            if (isSelected !== selectCheck) {
                yield protractor_1.element(elementLocator).click();
            }
        });
    }
    pause(millisecondsToSleep) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => setTimeout(resolve, millisecondsToSleep));
        });
    }
    // Other helpers
    /**
     * This method checks if the page is angular or non-angular and configure it for non-angular pages
     */
    navigateTo(pageURL) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.driver
                .manage()
                .window()
                .maximize();
            yield protractor_1.browser.driver.get(pageURL);
            yield protractor_1.browser
                .executeScript('return !!(window.angular || window.ng);')
                .then(function (isAngular) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!isAngular) {
                        yield protractor_1.browser.waitForAngularEnabled(false);
                    }
                });
            });
        });
    }
    getTextFromOneElementInAnElementList(elementLocator, index) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield protractor_1.element
                    .all(elementLocator)
                    .get(index)
                    .getText()
                    .then(function (text) {
                    resolve(text);
                });
            }));
        });
    }
    switchToFrame(frameLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.switchTo().defaultContent();
            yield protractor_1.browser.switchTo().frame(protractor_1.element(frameLocator).getWebElement());
        });
    }
    switchToSubFrame(frameLocator) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.switchTo().frame(protractor_1.element(frameLocator).getWebElement());
        });
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map