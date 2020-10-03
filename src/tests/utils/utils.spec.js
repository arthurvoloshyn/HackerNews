import { getIsValidNumber, trimString } from '../../utils/utils';

describe('trimString util', () => {
  describe('Positive trimming cases', () => {
    describe('should clip the string with an ellipsis', () => {
      it('should clip up to 5 characters', () => {
        expect(trimString('LongName', 5)).toBe('LongN...');
      });

      it('should clip up to 4 characters', () => {
        expect(trimString('LongName', 4)).toBe('Long...');
      });
    });

    it('should not clip the string with an ellipsis', () => {
      expect(trimString('LongName', 10)).toBe('LongName');
    });

    it('should remove whitespace characters and clip the string with an ellipsis', () => {
      expect(trimString('   LongName   ', 3)).toBe('Lon...');
    });
  });

  describe('Negative trimming cases', () => {
    it('should return a string with whitespace characters', () => {
      expect(trimString('     ', 4)).toBe('     ');
    });

    it('should return null', () => {
      expect(trimString(null, 4)).toBeNull();
    });

    it('should return undefined', () => {
      expect(trimString(undefined, 4)).toBeUndefined();
    });

    it('should return a number.', () => {
      expect(trimString(12345, 4)).toBe(12345);
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
