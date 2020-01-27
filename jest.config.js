module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    collectCoverage: true,
    collectCoverageFrom: [`<rootDir>/src/core/**/*.ts`],
    setupFiles: [`<rootDir>/tests/unit/index.ts`]
};
