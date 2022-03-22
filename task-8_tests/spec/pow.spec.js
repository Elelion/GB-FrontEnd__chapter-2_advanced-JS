const pow = require('./pow');

describe('Возведение в степень', () => {
  it('2 ^ 3 = 8', function () {
    expect(pow(2, 3)).toBe(8);
  });

  it('2 ^ 5 = 32', function () {
    expect(pow(2, 5)).toBe(32);
  });

  it('3 ^ 3 = 27', function () {
    expect(pow(3, 3)).toBe(27);
  });
});