export function isRGBForWhite(rgb: RgbColors) {
    return (rgb.red * 0.299 + rgb.green * 0.587 + rgb.blue * 0.114) > 186;
}
export interface RgbColors {
    red: number
    green: number
    blue: number
}
export function rgbToObject(rgb: string): RgbColors {
    if (!rgb) return {
        red: 0,
        blue: 0,
        green: 0
    }
    const values = rgb.substring(4, rgb.length - 1)
        .replace(/ /g, '')
        .split(',')
        .map(color => parseInt(color));

    return {
        red: values[0],
        green: values[1],
        blue: values[2],
    }
}