import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";

const MuteBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/mute.svg')
const VolumeUpBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/volume-up.svg')

const styles = require('./volume.css')

export interface VolumePops {
    onVolumeChange: (number: number) => void
    volume: number
    dominantBackgroundColor: string
}

export interface State {
    volume: number
}

export class Volume extends React.Component<VolumePops, State>  {
    public refs: {
        volume: HTMLInputElement
        [k: string]: React.ReactInstance
    }

    public constructor(props: VolumePops) {
        super(props)
        this.state = {
            volume: null
        }
    }

    public componentWillReceiveProps(props: VolumePops) {
        if (this.state.volume! = props.volume) {
            this.setState({
                volume: props.volume
            })
        }
    }

    public _onVolumeChanged = () => {
        const value = parseInt(this.refs.volume.value) / 100
        this.setState({
            volume: value
        })
        if (this.props.onVolumeChange)
            this.props.onVolumeChange(value)

    }

    public render() {
        const volume = this.state.volume * 100
        return (<div className={styles.volumeSlider}>
            <MuteBtnSvg className={styles.volumeSvgs} style={{
                fill: this.props.dominantBackgroundColor
            }} />
            <div className={styles.sliderContainer}>
                <input ref="volume" type="range" min="1" max="100" value={volume} onChange={() => this._onVolumeChanged()} style={{
                    background: this.props.dominantBackgroundColor
                }} className={styles.slider} />
            </div>
            <VolumeUpBtnSvg className={styles.volumeSvgs} style={{
                fill: this.props.dominantBackgroundColor
            }} />
        </div>
        )
    }
}
