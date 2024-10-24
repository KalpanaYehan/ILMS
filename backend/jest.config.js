// jest.config.js
export default {
  testEnvironment: "node", // Use node environment
  transform: {}, // Leave this empty for ESM
  extensionsToTreatAsEsm: [".js"], // Treat .js files as ESM
  globals: {
    'ts-jest': {
      useESM: true, // This is needed if you use TypeScript; can be removed if not using TS
    },
  },
};
