import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import WeatherItems from './WeatherItems';
import { WEATHER } from '../config/config.js';
import WeatherItem from '../weatherItem/WeatherItem';

Enzyme.configure({ adapter: new Adapter() });

describe('WeatherItems', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WeatherItems weather={WEATHER} />);
  });

  test('renders weather wrapper', () => {
    expect(wrapper.find('.weather').length).toBe(1);
  });

  test('shoud contain h1', () => {
    expect(wrapper.find('.weather__title').length).toBe(1);
    expect(wrapper.find('.weather__title').text()).toBe('Weather');
  });

  test('shoud contain weather items wrapper', () => {
    expect(wrapper.find('.weather__items').length).toBe(1);
  });

  test('shoud contain weather item component', () => {
    expect(wrapper.find(WeatherItem).length).toBe(WEATHER.length);
  });

  test('shoud match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
