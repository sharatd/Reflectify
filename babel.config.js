module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // Matches the "paths" configuration in tsconfig.json
          },
        },
      ],
    ],
  };
};