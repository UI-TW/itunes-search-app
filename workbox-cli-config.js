module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{js,html,css}"
  ],
  "swSrc": "src/sw.js",
  "swDest": "src/generated-sw.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
