export function isNumber(n: string | number) {
  return !isNaN(parseFloat(n.toString())) && !isNaN(+n - 0);
}
