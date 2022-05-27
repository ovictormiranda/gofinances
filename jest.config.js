module.exports = {
    preset: "jest-expo",
    testPathIgnorePatterns: [
      "/node_modules/",
      "/android",
      "/ios"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    setupFilesAfterEnv: [
      "jest-styled-components"
    ]
}
