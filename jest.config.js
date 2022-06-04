module.exports = {
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  collectCoverageFrom: [
    "!index.js",
    "!config/db.js",
    "!**/*.config.js",
    "!**/*.json",
  ],
  modulePathIgnorePatterns: ["<rootDir>/client/", "<rootDir>/node_modules/"],
  coverageReporters: ["text"],
};
