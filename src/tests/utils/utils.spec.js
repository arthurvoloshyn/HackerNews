import { getIsValidNumber, trimString } from '../../utils/utils';

describe('trimString util', () => {
  describe('Positive trimming cases', () => {
    describe('should slice the string with an ellipsis', () => {
      it('should slice up to 5 characters', () => {
        expect(trimString('LongName', 5)).toBe('LongN...');
      });

      it('should slice up to 4 characters', () => {
        expect(trimString('LongName', 4)).toBe('Long...');
      });
    });

    it('should not slice the string with an ellipsis', () => {
      expect(trimString('LongName', 10)).toBe('LongName');
    });

    it('should trim the space and slice the string with an ellipsis', () => {
      expect(trimString('   LongName   ', 3)).toBe('Lon...');
    });
  });

  describe('Negative trimming cases', () => {
    it('should return a string with space', () => {
      expect(trimString('     ', 4)).toBe('     ');
    });

    it('should return null', () => {
      expect(trimString(null, 4)).toBeNull();
    });

    it('should return undefined', () => {
      expect(trimString(undefined, 4)).toBeUndefined();
    });
  });
});

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
