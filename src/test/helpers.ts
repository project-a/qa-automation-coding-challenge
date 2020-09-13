import {Page} from "playwright";
import {v4} from "uuid";

export function getScreenshot(page: Page): Promise<Buffer> {
    return page.screenshot({fullPage: true, path: `${v4()}.png`});
}