import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";

const MuteBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/mute.svg')
const VolumeUpBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/volume-up.svg')

const styles = require('./volume.css')

export interface VolumePops {
    controller: Controller
    volumeUp: (number: number) => void
    volumeDown: (number: number) => void
    volume: number
    dominantBackgroundColor: string
}
export const Volume = (props: VolumePops) => {
    return (
        <div className={styles.volumeSlider}>
            <MuteBtnSvg className={styles.volumeSvgs} style={{
                fill: props.dominantBackgroundColor
            }}/>
            <div className={styles.sliderContainer}>
                <input type="range" min="1" max="100" defaultValue="22" style={{
                    background: props.dominantBackgroundColor
                }}className={styles.slider} />
            </div>
            <VolumeUpBtnSvg className={styles.volumeSvgs} style={{
                fill: props.dominantBackgroundColor
            }}/>
        </div>
    )
}
