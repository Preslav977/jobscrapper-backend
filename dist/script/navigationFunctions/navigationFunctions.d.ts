import type { Page } from "puppeteer";
declare function tryClick(page: Page, instruction: string, maxAttempt: number): Promise<string | void>;
declare function tryClickEvaluate(page: Page, instruction: string, maxAttempt: number): Promise<string | void>;
declare function tryClickLoadMore(page: Page, instruction: string): Promise<string | void>;
declare function selectOptionFromDropDown(page: Page, selectElement: string, selectOption: string, maxAttempt: number): Promise<string | void>;
declare function tryEventLocator(page: Page, instruction: string, event: string, maxAttempt: number): Promise<string | void>;
declare function sleepDelay(timeout: number): Promise<void>;
export { selectOptionFromDropDown, sleepDelay, tryClick, tryClickEvaluate, tryClickLoadMore, tryEventLocator, };
//# sourceMappingURL=navigationFunctions.d.ts.map