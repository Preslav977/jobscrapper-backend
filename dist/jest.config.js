import { createDefaultEsmPreset } from "ts-jest";
const presetConfig = createDefaultEsmPreset({
    preset: "ts-jest",
    testEnvironment: "node",
});
export default {
    ...presetConfig,
};
//# sourceMappingURL=jest.config.js.map