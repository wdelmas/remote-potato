import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
import { secondstoHHMMSS } from "../../utils/date";
import { Slider } from "react-toolbox/lib/slider";
import { changeCSSVar } from "../../utils/dom";

const styles = require('./playback.css')

export interface PlaybackPops {
    isPlaying: boolean
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
    time: number
    dominantBackgroundColor: string
}

let playbackInterval = null as any;

export class Playback extends React.Component<PlaybackPops, State>  {
    public refs: {
        time: HTMLInputElement
        [k: string]: React.ReactInstance
    }
    public constructor(props: PlaybackPops) {
        super(props)
        this.state = {
            timeAsPercentage: 0,
            time: 0,
            dominantBackgroundColor: 'rgb(0,0,0)'
        }
    }

    public componentWillReceiveProps(nextProps: PlaybackPops) {
        if (this.state.timeAsPercentage! = nextProps.currentTimeAsPercentage) {
            this.setState({
                timeAsPercentage: nextProps.currentTimeAsPercentage
            })
        }
        if (this.state.time! = nextProps.currentTime) {
            this.setState({
                time: nextProps.currentTime
            })
        }
        if (this.state.dominantBackgroundColor! = nextProps.dominantBackgroundColor) {
            this.setState({
                dominantBackgroundColor: nextProps.dominantBackgroundColor
            })

            changeCSSVar('progress-main-color', this.state.dominantBackgroundColor);
            changeCSSVar('slider-main-color', this.state.dominantBackgroundColor);
        }
        if (nextProps.isPlaying && !this.props.isPlaying) {
            playbackInterval = setInterval(() => {
                let time = this.state.time + 1
                let timeAsPercentage = Math.ceil((time * 100) / nextProps.duration);
                this.setState({
                    time,
                    timeAsPercentage
                })
            }, 1000);
        } else if (!nextProps.isPlaying && this.props.isPlaying) {
            clearInterval(playbackInterval);
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
                    <span>{secondstoHHMMSS(this.state.time)}</span>
                    <span>{secondstoHHMMSS(this.props.duration)}</span>
                </div>
            </div>
        )
    }
}
