export function removeDoubleTapZoom(tagName: string) {
    let tags = document.getElementsByTagName(tagName)
    for (let i = tags.length; i--;) {
        tags[i].addEventListener('touchstart', preventZoom)
    }
}

function preventZoom(e: any) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

    if (e) {
        e.preventDefault();

        if (e.target && e.target.click)
            e.target.click();
    }
}