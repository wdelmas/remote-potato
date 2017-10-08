import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
const Image1 = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/play-button.svg')

{/* <Image1 /> */}

const styles = require('./controls.css')

export interface ControlsPops {
    controller: Controller
    play: () => void
    pause: () => void
    seekBackward: (number: number) => void
    seekForward: (number: number) => void
    volumeUp: (number: number) => void
    volumeDown: (number: number) => void
    title: string
    duration: number
    currentTime: number
}
export const Controls = (props: ControlsPops) => {
    return (
        <div className={classnames(styles.container, styles.white)}>
            <div className={styles.timeSlider}>
                <input type="range" min="1" max="100" defaultValue="20" className={styles.slider} />
                <div className={styles.sliderInfos}>
                    <span>{props.currentTime}</span>
                    <span>{props.currentTime - props.duration}</span>
                </div>
            </div>
            <div className={styles.title}>
                <span>{props.title}</span>
            </div>
            
            <div className={styles.controls}>
                <button className={classnames(styles.button)} onClick={() => props.seekBackward(5)}><i className="fa fa-backward"></i></button>
                {
                    props.controller.isPlaying ?
                        <button className={classnames(styles.button)} onClick={() => props.pause()}><i className="fa fa-pause"></i></button>
                        :
                        <button className={classnames(styles.button)} onClick={() => props.play()}><i className="fa fa-play"></i></button>
                }

                <button className={classnames(styles.button)} onClick={() => props.seekForward(5)}><i className="fa fa-forward"></i></button>
            </div>
            <div className={styles.volumeSlider}>
                <div className={styles.mute}></div>
                <div className={styles.sliderContainer}>
                    <input type="range" min="1" max="100" defaultValue="20" className={styles.slider} />
                </div>
                <div className={styles.volumeUp}></div>
            </div>
        </div>
    )
}
