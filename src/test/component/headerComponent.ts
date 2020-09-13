import {Page} from "playwright";
import {step} from "../report/allureReportWrapper";
import {getScreenshot} from "../helpers";

export class HeaderComponent {

    private readonly page: Page;

    private readonly headerTextLocator: string = 'css=[data-testid="header"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async getHeaderText(): Promise<string | null> {
        await step('Get header text', getScreenshot(this.page));
        return this.page.textContent(this.headerTextLocator);
    }

}