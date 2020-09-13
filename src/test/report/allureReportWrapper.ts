import {Reporter, Status} from "jest-allure/dist/Reporter";

declare let reporter: Reporter; // injected

// Try/catch needed to run without any issues directly in WebStorm, as plugin not getting loaded

export function feature(name: string): void {
    reporter.feature(name);
}

export function story(name: string): void {
    reporter.story(name);
}

export async function step(name: string, screenshot: Promise<Buffer>) {
    console.log(name);
    reporter.startStep(name);
    reporter.addAttachment(name, await screenshot, "image/png");
    reporter.endStep();  // TODO wrap better method to know when ended, for now just screenshot holder
}