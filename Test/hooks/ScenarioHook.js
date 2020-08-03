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
const { BeforeAll, Before, After, AfterAll, Status, setDefaultTimeout } = require("cucumber");
const protractor_1 = require("protractor");
//import { config } from "../steps/conf.js";
const CucumberReportExtension_1 = require("../reporting/CucumberReportExtension");
const jsonReports = process.cwd() + "/reports/json";
setDefaultTimeout(500000);
BeforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    CucumberReportExtension_1.CucumberReportExtension.CreateReportFile(jsonReports);
}));
After(function (scenario) {
    return __awaiter(this, void 0, void 0, function* () {
        if (scenario.result.status === Status.FAILED) {
            // screenShot is a base-64 encoded PNG
            const screenShot = yield protractor_1.browser.takeScreenshot();
            this.attach(screenShot, "image/png");
        }
    });
});
//# sourceMappingURL=ScenarioHook.js.map