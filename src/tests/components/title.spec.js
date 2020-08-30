import React from 'react';

import Title from '../../components/title/title';

const setUp = props => shallow(<Title {...props} />);

describe('Title component', () => {
  it('should render Title component with props', () => {
    const component = setUp({ title: 'Test title' });
    expect(component).toMatchSnapshot();
  });

  it('should render Title component without props', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });
});
