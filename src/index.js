import 'babel-polyfill';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import App from './components/App';
import Handlebars from 'handlebars';
import Header from './components/Header';

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('getDynamicKey', function(obj, key1, key2) {
    return obj[key1][key2];
});

Handlebars.registerHelper('eitherOr', function(option1, option2, option3) {
    return option1 || option2 || option3;
});

new App().render();
