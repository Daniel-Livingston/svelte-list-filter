export function getUniqueValues(a, key) {
    return a
        .map((item) => item[key])
        .filter((value, index, self) => self.indexOf(value) === index);
}
