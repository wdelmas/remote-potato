import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
import { secondstoHHMMSS } from "../../utils/date";
import { Slider } from "react-toolbox/lib/slider";
import { changeCSSVar } from "../../utils/dom";

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
    dominantBackgroundColor: string
}
export class Playback extends React.Component<PlaybackPops, State>  {
    public refs: {
        time: HTMLInputElement
        [k: string]: React.ReactInstance
    }
    public constructor(props: PlaybackPops) {
        super(props)
        this.state = {
            timeAsPercentage: 0,
            dominantBackgroundColor: 'rgb(0,0,0)'
        }
    }

    public componentWillReceiveProps(props: PlaybackPops) {
        if (this.state.timeAsPercentage! = props.currentTimeAsPercentage) {
            this.setState({
                timeAsPercentage: props.currentTimeAsPercentage
            })
        }
        if (this.state.dominantBackgroundColor! = props.dominantBackgroundColor) {
            this.setState({
                dominantBackgroundColor: props.dominantBackgroundColor
            })

            changeCSSVar('progress-main-color', this.state.dominantBackgroundColor);
            changeCSSVar('slider-main-color', this.state.dominantBackgroundColor);
        }
    }

    public _onTimeChange = (value: number) => {
        if (typeof value == 'undefined') return;
        const time = (value * this.props.duration) / 100
        this.setState({
            timeAsPercentage: value
        })
        if (this.props.onTimeChange)
            this.props.onTimeChange(time)
    }

    public render() {
        return (
            <div className={styles.timeSlider}>
                <Slider value={this.state.timeAsPercentage}
                    onChange={this._onTimeChange.bind(this)} 
                    className={styles.slider}
                    theme={styles}/>
                <div className={styles.sliderInfos}>
                    <span>{secondstoHHMMSS(this.props.currentTime)}</span>
                    <span>{secondstoHHMMSS(this.props.duration)}</span>
                </div>
            </div>
        )
    }
}
