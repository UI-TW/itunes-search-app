module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{js,html,css}"
  ],
  "swSrc": "src/sw.js",
  "swDest": "dist/sw.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
