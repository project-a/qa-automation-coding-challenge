import {Page} from "playwright";
import {step} from "../report/allureReportWrapper";
import {getScreenshot} from "../helpers";

export class MessageComponent {

    private readonly page: Page;

    private readonly messageTextLocator: string = 'css=[data-testid="statusMessage"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async getMessageText(): Promise<string | null> {
        await step('Get message text', getScreenshot(this.page));
        return this.page.textContent(this.messageTextLocator);
    }
}