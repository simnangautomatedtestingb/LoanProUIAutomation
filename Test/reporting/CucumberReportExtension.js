"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CucumberReportExtension = void 0;
const fs = require("fs");
//import { mkdirp } from 'mkdirp'
const report = require("cucumber-html-reporter");
const Cucumber = require('cucumber');
class CucumberReportExtension {
    static CreateReportFile(dirName) {
        //Check of the directory exist
        if (!fs.existsSync(dirName))
            fs.mkdirSync(dirName);
    }
    static GenerateCucumberReport() {
        report.generate(this.cucumberReporterOptions);
    }
}
exports.CucumberReportExtension = CucumberReportExtension;
CucumberReportExtension.jsonDir = process.cwd() + "/reports/json";
CucumberReportExtension.htmlDir = process.cwd() + "/reports/html";
CucumberReportExtension.jsonFile = CucumberReportExtension.jsonDir + "/cucumber_report.json";
CucumberReportExtension.cucumberReporterOptions = {
    theme: "bootstrap",
    jsonFile: CucumberReportExtension.jsonFile,
    output: CucumberReportExtension.htmlDir + "/cucumber_reporter.html",
    reportSuiteAsScenarios: true,
    metadata: {
        "App Version": "0.0.1",
        "Test Environment": "Testing",
        "Browser": "Chrome",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Local"
    }
};
//# sourceMappingURL=CucumberReportExtension.js.map