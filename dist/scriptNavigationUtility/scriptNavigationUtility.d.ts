import type { Page } from "puppeteer";
declare function tryClick(page: Page, instruction: string, maxAttempt: number): Promise<string>;
declare function tryClickEvaluate(page: Page, instruction: string, maxAttempt: number): Promise<string>;
declare function tryClickLoadMore(page: Page, instruction: string, maxAttempt: number): Promise<string>;
declare function selectOptionFromDropDown(page: Page, selectElement: string, selectOption: string, maxAttempt: number): Promise<string>;
export { selectOptionFromDropDown, tryClick, tryClickEvaluate, tryClickLoadMore, };
//# sourceMappingURL=scriptNavigationUtility.d.ts.map