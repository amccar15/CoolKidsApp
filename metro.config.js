// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConifg = getDefaultConfig(__dirname);
defaultConifg.resolver.assetExts.push('cjs');

module.exports = defaultConifg;
