import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
import { secondstoHHMMSS } from "../../utils/date";

const styles = require('./playback.css')

export interface PlaybackPops {
    onTimeChange: (number: number) => void
    seekBackward: (number: number) => void
    seekForward: (number: number) => void
    duration: number
    currentTime: number
    currentTimeAsPercentage: number
    dominantBackgroundColor: string
}
export class Playback extends React.Component<PlaybackPops, {}>  {
    public refs: {
        time: HTMLInputElement
        [k: string]: React.ReactInstance
    }

    public _onTimeChange = () => {
        const time = parseInt(this.refs.time.value) * this.props.duration /100
        
        if (this.props.onTimeChange)
            this.props.onTimeChange(time)
    }
    public render() {
        return (
            <div className={styles.timeSlider}>
                <input ref="time" type="range" min="1" max="100"
                    value={this.props.currentTimeAsPercentage.toString()}
                    className={styles.slider}
                    onChange={() => this._onTimeChange()}
                />
                <div className={styles.sliderInfos}>
                    <span>{secondstoHHMMSS(this.props.currentTime)}</span>
                    <span>{secondstoHHMMSS(this.props.duration)}</span>
                </div>
            </div>
        )
    }
}
