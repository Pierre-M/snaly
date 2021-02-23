const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,vue}",
    "!**/*.model.ts",
    "!vite.config.ts",
    "!src/config/**/*",
    "!src/App.vue",
    "!src/main.ts",
    "!**/*.d.ts",
  ],
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.init.ts"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.spec.ts?(x)"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
};
