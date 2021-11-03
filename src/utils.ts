export function getUniqueValues(
    items: { [key: string]: string }[],
    key: string
): string[] {
    return items
        .map((item) => item[key])
        .filter((value, index, self) => self.indexOf(value) === index);
}
