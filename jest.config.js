module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    collectCoverage: true,
    collectCoverageFrom: [
        `<rootDir>/src/App.vue`,
        `<rootDir>/src/core/**/*.ts`,
        `<rootDir>/src/store/**/*.ts`,
        `<rootDir>/src/business/**/*.ts`
    ],
    setupFiles: [`<rootDir>/tests/unit/index.ts`]
};
