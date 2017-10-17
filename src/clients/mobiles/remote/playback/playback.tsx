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
export interface State {
    timeAsPercentage: number
}
export class Playback extends React.Component<PlaybackPops, State>  {
    public refs: {
        time: HTMLInputElement
        [k: string]: React.ReactInstance
    }
    public constructor(props: PlaybackPops) {
        super(props)
        this.state = {
            timeAsPercentage: 0
        }
    }

    public componentWillReceiveProps(props: PlaybackPops) {
        if (this.state.timeAsPercentage! = props.currentTimeAsPercentage) {
            this.setState({
                timeAsPercentage: props.currentTimeAsPercentage
            })
        }
    }

    public _onTimeChange = () => {
        const timeAsPercentage = parseInt(this.refs.time.value)
        const time = timeAsPercentage* this.props.duration /100
        this.setState({
            timeAsPercentage: timeAsPercentage
        })
        if (this.props.onTimeChange)
            this.props.onTimeChange(time)
    }
    public render() {
        return (
            <div className={styles.timeSlider}>
                <input ref="time" type="range" min="1" max="100"
                    value={this.state.timeAsPercentage.toString()}
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
