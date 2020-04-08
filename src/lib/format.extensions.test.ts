import {
  formatBet,
  formatMultiplier,
  formatProfit,
  formatBitcoin,
  formatBitcoinSmart,
} from './format.extensions';

describe('formatBitcoin', () => {
  it('should return valid format', () => {
    // Arrange
    const value = '0.425';

    // Act
    const actual = formatBitcoin(value);

    // Assert
    const expected = '0.42500000';

    expect(actual).toEqual(expected);
  });
});

describe('formatBitcoinSmart', () => {
  it('should return valid format', () => {
    // Arrange
    const value = '425';

    // Act
    const actual = formatBitcoinSmart(value);

    // Assert
    const expected = '0.42500000';

    expect(actual).toEqual(expected);
  });
  it('should return valid format', () => {
    // Arrange
    const value = '0.425';

    // Act
    const actual = formatBitcoinSmart(value);

    // Assert
    const expected = '0.42500000';

    expect(actual).toEqual(expected);
  });
});

describe('formatBet', () => {
  it('should return valid format', () => {
    // Arrange
    const value = '425';

    // Act
    const actual = formatBet(value);

    // Assert
    const expected = '0.42500000';

    expect(actual).toEqual(expected);
  });
});

describe('formatMultiplier', () => {
  it('should return valid format', () => {
    // Arrange
    const value = '3';

    // Act
    const actual = formatMultiplier(value);

    // Assert
    const expected = 'x0.750';

    expect(actual).toEqual(expected);
  });
});

describe('formatProfit', () => {
  it('should return valid positive format', () => {
    // Arrange
    const value = '581';

    // Act
    const actual = formatProfit(value);

    // Assert
    const expected = '+0.58100000';

    expect(actual).toEqual(expected);
  });
  it('should return valid negative format', () => {
    // Arrange
    const value = '-130';

    // Act
    const actual = formatProfit(value);

    // Assert
    const expected = '-0.13000000';

    expect(actual).toEqual(expected);
  });
});
