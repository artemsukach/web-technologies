import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import WeatherItem from './WeatherItem';
import { WEATHER } from '../config/config';
import { WeatherDay } from '../WeatherItemComponent/WeatherDay.jsx';
import { WeatherDate } from '../WeatherItemComponent/WeatherDate.jsx';
import { WeatherMonth } from '../WeatherItemComponent/WeatherMonth.jsx';
import { WeatherYear } from '../WeatherItemComponent/WeatherYear.jsx';
import { WeatherDescription } from '../WeatherItemComponent/WeatherDescription.jsx';
import { WeatherTemperature } from '../WeatherItemComponent/WeatherTemperature.jsx';
import { WeatherPressure } from '../WeatherItemComponent/WeatherPressure.jsx';
import { WeatherHumidity } from '../WeatherItemComponent/WeatherHumidity.jsx';
import { WeatherWindSpeed } from '../WeatherItemComponent/WeatherWindSpeed.jsx';
import { WeatherWindDirection } from '../WeatherItemComponent/WeatherWindDirection.jsx';
import { getMonthNum } from '../utils/getMonthNum';
import { getDateNum } from '../utils/getDateNum';
import { getDayNum } from '../utils/getDayNum';
import { getYearNum } from '../utils/getYearNum';
import { transformDate } from '../utils/transformDate.js';

Enzyme.configure({ adapter: new Adapter() });

describe('WeatherItem', () => {
  let wrapper;
  const item = WEATHER[0];
  const newDate = new Date(WEATHER[0].date);
  const { day, dateNum, month, year } = transformDate(
    newDate,
    getMonthNum,
    getDateNum,
    getDayNum,
    getYearNum
  );

  beforeEach(() => {
    wrapper = mount(<WeatherItem {...item} />);
  });

  test('shoud render weather item wrapper', () => {
    expect(wrapper.find('.weather__item').length).toBe(1);
  });

  test('shoud render day', () => {
    expect(wrapper.find(WeatherDay).length).toBe(1);
    expect(wrapper.find('.weather__day').length).toBe(1);
    expect(wrapper.find('.weather__day').text()).toBe(day);
  });

  test('shoud render date', () => {
    expect(wrapper.find(WeatherDate).length).toBe(1);
    expect(wrapper.find('.weather__date').length).toBe(1);
    expect(wrapper.find('.weather__date').text()).toBe(dateNum.toString());
  });

  test('shoud render month', () => {
    expect(wrapper.find(WeatherMonth).length).toBe(1);
    expect(wrapper.find('.weather__month').length).toBe(1);
    expect(wrapper.find('.weather__month').text()).toBe(month);
  });

  test('shoud render year', () => {
    expect(wrapper.find(WeatherYear).length).toBe(1);
    expect(wrapper.find('.weather__year').length).toBe(1);
    expect(wrapper.find('.weather__year').text()).toBe(`${year} year`);
  });

  test('shoud render description', () => {
    expect(wrapper.find(WeatherDescription).length).toBe(1);
    expect(wrapper.find('.weather__description').length).toBe(1);
    expect(wrapper.find('.weather__description').prop('src')).toBe(
      item.description
    );
  });

  test('shoud render temperature', () => {
    expect(wrapper.find(WeatherTemperature).length).toBe(1);
    expect(wrapper.find('.weather__temperature-wrapper').length).toBe(1);
    expect(wrapper.find('.weather__min-temperature').length).toBe(1);
    expect(wrapper.find('.weather__min-description').length).toBe(1);
    expect(wrapper.find('.weather__min-value').length).toBe(1);
    expect(wrapper.find('.weather__max-temperature').length).toBe(1);
    expect(wrapper.find('.weather__max-description').length).toBe(1);
    expect(wrapper.find('.weather__max-value').length).toBe(1);
    expect(wrapper.find('.weather__max-description').text()).toBe('max');
    expect(wrapper.find('.weather__min-description').text()).toBe('min');
  });

  test('shoud render pressure', () => {
    expect(wrapper.find(WeatherPressure).length).toBe(1);
    expect(wrapper.find('.weather__atmospheric-pressure').length).toBe(1);
    expect(wrapper.find('.weather__atmospheric-pressure').text()).toBe(
      `Atmospheric pressure: ${item.atmosphericPressure}`
    );
  });

  test('shoud render humidity', () => {
    expect(wrapper.find(WeatherHumidity).length).toBe(1);
    expect(wrapper.find('.weather__humidity').length).toBe(1);
    expect(wrapper.find('.weather__humidity').text()).toBe(
      `Reletive humidity: ${item.relativeHumidity}`
    );
  });

  test('shoud render wind speed', () => {
    expect(wrapper.find(WeatherWindSpeed).length).toBe(1);
    expect(wrapper.find('.weather__wind-speed').length).toBe(1);
    expect(wrapper.find('.weather__wind-speed').text()).toBe(
      `Wind speed: ${item.windSpeed}`
    );
  });

  test('shoud render wind direction', () => {
    expect(wrapper.find(WeatherWindDirection).length).toBe(1);
    expect(wrapper.find('.weather__wind-direction').length).toBe(1);
    expect(wrapper.find('.weather__wind-direction').text()).toBe(
      `Wind direction: ${item.windDirection}`
    );
  });

  test('shoud match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
