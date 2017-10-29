import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";

const MaximizeBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/maximize.svg')
const MinimizeBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/minimize.svg')
const StarBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/star.svg')
const StarFilledBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/star-filled.svg')

const styles = require('./bottom-controls.css')

export interface BottomControlsPops {
    controller: Controller
    enterFullScreen: () => void
    exitFullScreen: () => void
    dominantBackgroundColor: string
}
export const BottomControls = (props: BottomControlsPops) => {
    setTimeout(() => {
        document.getElementById('bottomControls').scrollIntoView();
    }, 0);
    return (
        <div className={styles.bottomControls} id="bottomControls">
            {/* {
                !props.controller.isFullScreen ?
                    <button className={classnames(styles.button, styles.ripple)} onClick={() => props.exitFullScreen()}>
                        <StarBtnSvg className={styles.starsSvgs} style={{
                            fill: props.dominantBackgroundColor
                        }}/>
                    </button>
                    :
                    <button className={classnames(styles.button, styles.ripple)} onClick={() => props.enterFullScreen()}>
                        <StarFilledBtnSvg className={styles.starsSvgs}/>
                    </button>
            } */}
            {
                props.controller.isFullScreen ?
                    <button className={classnames(styles.button, styles.ripple)} onClick={() => props.exitFullScreen()}>
                        <MinimizeBtnSvg  style={{
                            fill: props.dominantBackgroundColor
                        }}/>
                    </button>
                    :
                    <button className={classnames(styles.button, styles.ripple)} onClick={() => props.enterFullScreen()}>
                        <MaximizeBtnSvg  style={{
                            fill: props.dominantBackgroundColor
                        }}/>
                    </button>
            }
        </div>
    )
}
