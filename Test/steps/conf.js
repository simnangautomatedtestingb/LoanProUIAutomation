"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const protractor_1 = require("protractor");
const CucumberReportExtension_1 = require("../reporting/CucumberReportExtension");
const jsonReports = process.cwd() + "/reports/json";
exports.config = {
    // if using seleniumServerJar, do not specify seleniumAddress !!!
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //directConnect:true,
    SELENIUM_PROMISE_MANAGER: false,
    specs: ["../features/*.feature"],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    suites: {
        "login": "../features/Login.feature"
    },
    onPrepare: () => {
        protractor_1.browser.waitForAngularEnabled(false);
        protractor_1.browser.manage().window().maximize();
        CucumberReportExtension_1.CucumberReportExtension.CreateReportFile(jsonReports);
    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        strict: true,
        // format: ['pretty'],
        format: "json:./reports/json/cucumber_report.json",
        require: ['../steps/*.js', '../hooks/*.js'],
        tags: '@smoke'
    },
    onComplete: () => {
        CucumberReportExtension_1.CucumberReportExtension.GenerateCucumberReport();
    },
};
//# sourceMappingURL=conf.js.map