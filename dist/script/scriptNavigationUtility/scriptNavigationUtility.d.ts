import type { Page } from "puppeteer";
declare function tryClick(page: Page, instruction: string, maxAttempt: number): Promise<string>;
declare function tryClickEvaluate(page: Page, instruction: string, maxAttempt: number): Promise<string>;
declare function tryClickLoadMore(page: Page, instruction: string): Promise<string>;
declare function selectOptionFromDropDown(page: Page, selectElement: string, selectOption: string, maxAttempt: number): Promise<string>;
declare function tryEventLocator(page: Page, instruction: string, event: string, maxAttempt: number): Promise<string>;
declare function sleepDelay(timeout: number): Promise<void>;
export { selectOptionFromDropDown, sleepDelay, tryClick, tryClickEvaluate, tryClickLoadMore, tryEventLocator, };
//# sourceMappingURL=scriptNavigationUtility.d.ts.map