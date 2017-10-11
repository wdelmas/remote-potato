export function isRGBForWhite(red: number, green: number, blue: number) {
    return (red*0.299 + green*0.587 + blue*0.114) > 186;    
}

export function rgbToObject(rgb: string) : number[] {
    if (!rgb) return [0, 0, 0];
     return rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',')
         .map(color => parseInt(color));
}