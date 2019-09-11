import React from 'react';
import Enzyme, { shallow , mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchEventsForm from '../components/events/SearchEventsForm';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchEventsForm', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(<SearchEventsForm />);
  });

  it('should has a text input field', () => {
    const input = wrapper.find('Input');
    expect(input.text()).toBe('<Input />');
  });

  it('should has a text input field', () => {
    const input = wrapper.find('Input');
    expect(input.text()).toBe('<Input />');
  });

  it('should has a button', () => {
    const button = wrapper.find('Button');
    // button.prop('onSubmit');
    expect(button.text()).toBe('<Button />');
  });
  
});