function rotatedArraySearch(rotated, target) {
  const isLeft = rotated[0] <= target;
  let left = 0;
  let right = rotated.length - 1;
  let middle = Math.floor((rotated.length - 1) / 2);

  let count = 0;
  while (count < rotated.length) {
    count += 1;
  }
}
