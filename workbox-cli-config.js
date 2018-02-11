module.exports = {
  "globDirectory": "dist/",
//  <!-- Step 2a: Pre-cache minimal assets  -->
  "globPatterns": [
    "**/*.{js,html,css}"
  ],
//  <!-- Step 2a: Pre-cache minimal assets  -->
  "swSrc": "src/sw.js",
  "swDest": "dist/sw.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
