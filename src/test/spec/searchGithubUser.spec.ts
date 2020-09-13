import {v4} from "uuid";
import {Browser, Page} from "playwright";
import {expect} from "chai";
import {MainPage} from "../page/mainPage";
import {feature, story} from "../report/allureReportWrapper";
import {config} from "../config/config";

const playwright = require('playwright');

describe('Get Github Repos web site', () => {
    let mainPage: MainPage;

    let page: Page;
    let browser: Browser;

    beforeAll(async () => {
        // TODO something might be reusable, move to common place
        browser = await playwright[config.browser].launch();
        const context = await browser.newContext();
        page = await context.newPage();

        mainPage = new MainPage(page);
    });

    beforeEach(async () => {
        await page.goto(config.url);

        const headerText = await mainPage.header.getHeaderText();
        expect(headerText, 'Header text is incorrect').to.be.equal('Get Github Repos');
    });


    it('should search for user repositories', async () => {
        feature('Github repos search');
        story('User should be able to get all repositories');

        await mainPage.search.typeUsername("oleg-toporkov");
        await mainPage.search.clickGo();

        const messageText = await mainPage.message.getMessageText();
        expect(messageText, 'Message text is incorrect').to.be.equal('Success!');

        const repositoriesFoundMessage = await mainPage.resultsList.getRepositoriesFoundMessage();
        expect(repositoriesFoundMessage, 'Repositories found message text is incorrect')
            .to.be.equal('Found 10 Repos');

        const repository5Link = await mainPage.resultsList.getRepositoryLinkText(5); // TODO well, not very good to rely on the order of repositories
        expect(repository5Link, 'Fifth repository link text is incorrect')
            .to.be.equal('qa-automation-coding-challenge');

        const repository5Description = await mainPage.resultsList.getRepositoryDescription(5);
        expect(repository5Description, 'Fifth repository description is incorrect')
            .to.be.equal('–');
    });

    it('should give an error if user does not exist', async () => {
        feature('Github repos search');
        story('User should be see an error if github username does not exist');

        await mainPage.search.typeUsername(v4());
        await mainPage.search.clickGo();

        const messageText = await mainPage.message.getMessageText();
        expect(messageText, 'Message text is incorrect').to.be.equal('Github user not found');
    });


    afterAll(async () => {
        await page.close();
        await browser.close();
    });
});