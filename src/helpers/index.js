const Handlebars = require('handlebars-template-loader/runtime');

Handlebars.registerHelper('eq', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

