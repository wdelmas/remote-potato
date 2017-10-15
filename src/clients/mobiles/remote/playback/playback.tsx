import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
import {secondstoHHMMSS} from "../../utils/date";

const styles = require('./playback.css')

export interface PlaybackPops {
    controller: Controller
    seekBackward: (number: number) => void
    seekForward: (number: number) => void
    duration: number
    currentTime: number
    currentTimeAsPercentage: string
    dominantBackgroundColor: string
}
export const Playback = (props: PlaybackPops) => {
    return (
        <div className={styles.timeSlider}>
            <input type="range" min="1" max="100" defaultValue="33" className={styles.slider} />
            <div className={styles.sliderInfos}>
                <span>{secondstoHHMMSS(props.currentTime)}</span>
                <span>{secondstoHHMMSS(props.duration)}</span>
            </div>
        </div>
    )
}
