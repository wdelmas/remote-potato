import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";

const styles = require('./title.css')

export interface TitlePops {
    title: string
    subTitle?: string
    dominantBackgroundColor: string
}
export const Title = (props: TitlePops) => {
    return (
        <div className={styles.title}>
            <span>{props.title}</span>
            <span className={styles.subTitle}>{props.subTitle}</span>
        </div>
    )
}
