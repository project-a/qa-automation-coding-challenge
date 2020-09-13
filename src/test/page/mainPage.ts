import {Page} from "playwright";
import {HeaderComponent} from "../component/headerComponent";
import {MessageComponent} from "../component/messageComponent";
import {ResultsListComponent} from "../component/resultsListComponent";
import {SearchComponent} from "../component/searchComponent";

export class MainPage {

    private readonly page: Page;

    public readonly header: HeaderComponent;
    public readonly message: MessageComponent;
    public readonly resultsList: ResultsListComponent;
    public readonly search: SearchComponent;


    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(this.page);
        this.message = new MessageComponent(this.page);
        this.resultsList = new ResultsListComponent(this.page);
        this.search = new SearchComponent(this.page);
    }
}