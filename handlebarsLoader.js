// handlebarsLoader.js
module.exports = {
  process(src) {
    return `
    const Handlebars = require('handlebars');
    module.exports = Handlebars.compile(\`${src}\`);
    `;
  },
};