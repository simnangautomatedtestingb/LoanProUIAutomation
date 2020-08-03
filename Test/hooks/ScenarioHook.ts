const { BeforeAll, Before, After, AfterAll, Status, setDefaultTimeout } = require("cucumber");
import { browser } from "protractor";
//import { config } from "../steps/conf.js";
import { CucumberReportExtension } from "../reporting/CucumberReportExtension";

const jsonReports = process.cwd() + "/reports/json";


    setDefaultTimeout(500000);

    BeforeAll(async () => {
        CucumberReportExtension.CreateReportFile(jsonReports);
    });

    After(async function(scenario) {
        if (scenario.result.status === Status.FAILED) {
            // screenShot is a base-64 encoded PNG
             const screenShot = await browser.takeScreenshot();
             this.attach(screenShot, "image/png");
        }
    });


