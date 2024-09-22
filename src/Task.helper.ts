export function getRangeString(quantities: number[]): string {
    if (quantities.length === 0) {
        return "";
    }
    if (quantities.length === 1) {
        return String(quantities[0]);
    }
    return `${quantities[0]}-${quantities[quantities.length - 1]}`;
}