import {Page} from "playwright";
import {step} from "../report/allureReportWrapper";
import {getScreenshot} from "../helpers";

export class SearchComponent {

    private readonly page: Page;

    private readonly usernameInputLocator: string = 'css=[data-testid="usernameInput"]';
    private readonly goButtonLocator: string = 'css=[data-testid="submitButton"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async typeUsername(text: string): Promise<void> {
        await step('Type username', getScreenshot(this.page));
        return this.page.type(this.usernameInputLocator, text);
    }

    public async clickGo(): Promise<void> {
        await step('Click go', getScreenshot(this.page));
        return this.page.click(this.goButtonLocator);
    }

}