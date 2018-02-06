module.exports = {
  verbose: true,
  "transform": {
    "^.+\\.js$": "babel-jest",
    "^.+\\.(css|scss|less)$": "jest-css-modules",
    "^.+\\.tpl\\.html$": "./handlebarsLoader.js"
    }
};