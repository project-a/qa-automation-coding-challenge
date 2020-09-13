import {Page} from "playwright";
import {step} from "../report/allureReportWrapper";
import {getScreenshot} from "../helpers";

export class ResultsListComponent {

    private readonly page: Page;

    private readonly repositoryRowLocator: string = 'css=[data-testid="repositoryRow"]';
    private readonly repositoryDescriptionLocator: string = 'css=[data-testid="repositoryDescription"]';
    private readonly repositoryLinkLocator: string = 'css=[data-testid="repositoryLink"]';
    private readonly repositoriesFoundLocator: string = 'css=[data-testid="repositoriesFoundMessage"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async getRepositoryLinkText(num: number): Promise<string | null | undefined> {
        await step(`Get repository ${num} link text`, getScreenshot(this.page));
        const rows = await this.page.$$(this.repositoryRowLocator);
        const row = await rows[num-1].$(this.repositoryLinkLocator);
        return row?.textContent();
    }

    public async getRepositoryDescription(num: number): Promise<string | null | undefined> {
        await step(`Get repository ${num} description`, getScreenshot(this.page));
        const rows = await this.page.$$(this.repositoryRowLocator);
        const row = await rows[num-1].$(this.repositoryDescriptionLocator);
        return row?.textContent();
    }

    public async getRepositoriesFoundMessage(): Promise<string | null> {
        await step('Get repositories found message', getScreenshot(this.page));
        return this.page.textContent(this.repositoriesFoundLocator);
    }

}