module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [
    "<rootDir>/src/**/*.(spec|test).(ts|js)"
  ]
}
