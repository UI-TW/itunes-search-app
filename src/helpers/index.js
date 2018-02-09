const Handlebars = require('handlebars-template-loader/runtime');

Handlebars.registerHelper('isRouteActive', function (view, options) {
  const viewToRender = location.hash.replace('#', '') || 'search';
  return (viewToRender === view) ? options.fn(this) : options.inverse(this);
});

