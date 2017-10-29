export function changeCSSVar(cssVar: string, value: string) {
    document.documentElement.style.setProperty(`--${cssVar}`, value);
}