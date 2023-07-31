const checkPrimeNumberTest = (n) => {
    if (n < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }

    return true;
};

test('checkPrimeNumber', () => {
    expect(checkPrimeNumberTest(2)).toBe(true);
    expect(checkPrimeNumberTest(3)).toBe(true);
    expect(checkPrimeNumberTest(4)).toBe(false);
    expect(checkPrimeNumberTest(79)).toBe(true);
});
