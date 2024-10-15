const { getDefaultConfig } = require('expo/metro-config');
const { withSentry } = require('@sentry/react-native/expo');

const config = getDefaultConfig(__dirname);

module.exports = withSentry(config);