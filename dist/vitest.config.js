import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        exclude: ["./dist"],
        fileParallelism: false,
    },
});
//# sourceMappingURL=vitest.config.js.map