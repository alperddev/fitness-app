module.exports = function (api) {
  api.cache(true)
  let plugins = []
  plugins.push([
    "@tamagui/babel-plugin",
    {
      components: ["tamagui"],
      config: "./utils/tamagui.config.ts",
    },
  ])
  return {
    presets: ["babel-preset-expo"],
    plugins,
  }
}
