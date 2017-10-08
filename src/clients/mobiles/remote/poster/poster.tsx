import * as React from "react";
const styles = require('./poster.css')


export const Poster = (props: { url: string }) => {
    const url: string = `url(${props.url}) no-repeat center center`
    return (<div className={styles.poster}
        style={{
            background: url
        }}
    ></div >)
}
