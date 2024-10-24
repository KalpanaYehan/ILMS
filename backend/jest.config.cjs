module.exports = {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest", // To handle ES6+ with Babel
    },
    moduleFileExtensions: ["js", "jsx"],
    testMatch: ["/_tests_//.[jt]s?(x)", "/?(.)+(spec|test).[tj]s?(x)"],
  };