/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
    },
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
