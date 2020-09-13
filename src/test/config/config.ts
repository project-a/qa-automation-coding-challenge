import {IConfig} from "./types";

export const config: IConfig = {
    url: process.env['FRONTEND_URL'] || 'http://localhost:3000',
    browser: process.env['DEFAULT_BROWSER'] || 'chromium'
}