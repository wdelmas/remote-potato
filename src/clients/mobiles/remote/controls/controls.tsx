import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
import {secondstoHHMMSS} from "../../utils/date";

const PlayBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/play.svg')
const BackwardBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/backward.svg')
const PauseBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/pause.svg')
const ForwardBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/forward.svg')

const styles = require('./controls.css')

export interface ControlsPops {
    isPlaying: boolean
    play: () => void
    pause: () => void
    seekBackward: (number: number) => void
    seekForward: (number: number) => void
    dominantBackgroundColor: string
}
export const Controls = (props: ControlsPops) => {
    setTimeout(() => {
        document.getElementById('bottomControls').scrollIntoView();
    }, 0);
    return (
        <div className={styles.controls}>

            <button className={classnames(styles.button)} onClick={() => props.seekBackward(5)}>
                <BackwardBtnSvg style={{
                    fill: props.dominantBackgroundColor
                }}/>
            </button>
            {
                props.isPlaying ?
                    <button className={classnames(styles.button)} onClick={() => props.pause()}>
                        <PauseBtnSvg  style={{
                            fill: props.dominantBackgroundColor
                        }}/>
                    </button>
                    :
                    <button className={classnames(styles.button)} onClick={() => props.play()}>
                        <PlayBtnSvg  style={{
                            fill: props.dominantBackgroundColor
                        }}/>
                    </button>
            }

            <button className={classnames(styles.button)} onClick={() => props.seekForward(5)}>
                <ForwardBtnSvg  style={{
                    fill: props.dominantBackgroundColor
                }}/>
            </button>
        </div>
    )
}
