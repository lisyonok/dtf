export default function randomId() {
  // eslint-disable-next-line no-array-constructor
  return Array(1, 2, 3)
    .map(() => Math.random().toString(16))
    .join("")
    .replaceAll("0.", "")
}
