import { Config, browser } from 'protractor';
import { CucumberReportExtension } from '../reporting/CucumberReportExtension';
const jsonReports = process.cwd() + "/reports/json";

export let config: Config = {
    
    // if using seleniumServerJar, do not specify seleniumAddress !!!
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //directConnect:true,

    SELENIUM_PROMISE_MANAGER: false,

    specs: ["../features/*.feature"],
    
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    
    suites: {
        "login" : "../features/Login.feature"
    },

    onPrepare: () => {
         browser.waitForAngularEnabled(false);
         browser.manage().window().maximize();
         CucumberReportExtension.CreateReportFile(jsonReports);
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
        CucumberReportExtension.GenerateCucumberReport();
    },
}