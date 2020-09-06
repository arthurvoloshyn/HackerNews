import React from 'react';

import Input from '../../components/input/input';

const setUp = props => shallow(<Input {...props} />);

describe('Input component', () => {
  it('should render Input component', () => {
    const component = setUp();
    expect(component).toMatchSnapshot();
  });

  describe('should call onClick method', () => {
    const mockCallBack = jest.fn();

    it('before calling the onClick method', () => {
      expect(mockCallBack.mock.calls.length).toBe(0);
    });

    it('after calling the onClick method', () => {
      const component = setUp({ onChange: mockCallBack });
      component.find('.input').simulate('change');
      expect(mockCallBack.mock.calls.length).toBe(1);
    });
  });

  describe('defaultProps', () => {
    it('should use default onChange', () => {
      const result = Input.defaultProps.onChange();
      expect(result).toBe(undefined);
    });

    it('should use default onKeyPress', () => {
      const result = Input.defaultProps.onKeyPress();
      expect(result).toBe(undefined);
    });
  });
});
