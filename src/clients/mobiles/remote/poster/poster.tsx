import * as React from "react";
import { Controller } from "../../store/videoPlayer/index";
const styles = require('./poster.css')
const NO_POSTER_IMG = 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?dpr=1&auto=compress,format&fit=crop&w=1498&h=&q=80&cs=tinysrgb&crop=';

export interface PosterProps {
    controller: Controller
    url: string
}

export const Poster = (props: PosterProps) => {
    const url: string = `url(${props.url || NO_POSTER_IMG}) no-repeat center center`
    return (<div className={styles.poster}
        style={{
            background: url
        }}
    >
    {
        !props.url ?
        <div className={styles.noPoster}>We couldn't find an image<br/> Here's an ananas 🤗</div>
        : ''
    }
    </div >)
}
