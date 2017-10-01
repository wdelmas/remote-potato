const fonts = [
    'Montserrat'
]

export interface StatusComponent {
    component: HTMLElement
    value: HTMLElement
}

export const appendStatusToContainer = (container: HTMLElement) => {
    let statusComponent = document.createElement('div');
    statusComponent.id = 'status-couch-potatoe';

    let statusIcon = document.createElement('span');
    let statusValue = document.createElement('span');

    statusComponent.appendChild(statusIcon);
    statusComponent.appendChild(statusValue);

    container.appendChild(statusComponent);
    fonts.forEach(font => appendFont(font))

    return {
        component: statusComponent,
        value: statusValue
    } as StatusComponent;
}

export const appendFont = (font: string) => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css?family=${font}:100,200,400`;
    document.getElementsByTagName('head')[0].appendChild(link);
}