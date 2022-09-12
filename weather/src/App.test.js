import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';
import WeatherItems from './WeatherItems/WeatherItems';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('renders main wrapper', () => {
    expect(wrapper.find('.App').length).toBe(1);
  });

  test('renders WeatherItems component', () => {
    expect(wrapper.find(WeatherItems).length).toBe(1);
  });

  test('shoud match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
