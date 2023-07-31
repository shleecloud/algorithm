const getPermutationsTest = (arr, selectNumber) => {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]);

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
        const permutations = getPermutationsTest(rest, selectNumber - 1);
        const attached = permutations.map((el) => [fixed, ...el]);
        results.push(...attached);
    });

    return results;
};

test('getPermutations', () => {
    expect(getPermutationsTest([1, 2, 3, 4], 3)).toEqual(
        expect.arrayContaining([
            [1, 2, 3],
            [1, 2, 4],
            [1, 3, 2],
            [1, 3, 4],
            [1, 4, 2],
            [1, 4, 3],
            [2, 1, 3],
            [2, 1, 4],
            [2, 3, 1],
            [2, 3, 4],
            [2, 4, 1],
            [2, 4, 3],
            [3, 1, 2],
            [3, 1, 4],
            [3, 2, 1],
            [3, 2, 4],
            [3, 4, 1],
            [3, 4, 2],
            [4, 1, 2],
            [4, 1, 3],
            [4, 2, 1],
            [4, 2, 3],
            [4, 3, 1],
            [4, 3, 2],
        ]),
    );
});
