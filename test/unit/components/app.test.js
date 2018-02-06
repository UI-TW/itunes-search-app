
import App from '../../../src/components/App';
const $ = require('jquery');


xdescribe('App', () => {
  test('App component should renders correctly', () => {
    const component = new App();
    expect(component.render()).toMatchSnapshot();
  });
});