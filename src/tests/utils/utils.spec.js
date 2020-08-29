import { getIsValidNumber } from '../../utils/utils';

describe('getIsValidNumber util', () => {
  it('Positive checking cases', () => {
    const numbers = [1, 0, -1, 0.5, '123', '321asd'];
    for (let int = 1; int < numbers.length; int++) {
      expect(getIsValidNumber(numbers[int])).toBeTruthy();
    }
  });

  it('Negative checking cases', () => {
    const notNumbers = ['asd321', 'qwe', Infinity, undefined, null, [], {}];
    for (let int = 1; int < notNumbers.length; int++) {
      expect(getIsValidNumber(notNumbers[int])).toBeFalsy();
    }
  });
});
