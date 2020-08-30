import React from 'react';

import Post from '../../components/post/post';

const setUp = props => shallow(<Post {...props} />);

describe('should render Post component', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it('should contain .post wrapper', () => {
    const wrapper = component.find('.post');
    expect(wrapper.length).toBe(1);
  });

  it('should contain link', () => {
    const wrapper = component.find('a');
    expect(wrapper.length).toBe(1);
  });

  it('should render created date', () => {
    const createdAt = '01-03-2020';
    component = setUp({ createdAt });
    const date = component.find('.date');
    expect(date.text()).toBe(new Date(createdAt).toLocaleDateString());
  });
});
