import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
const styles = require('./controls.css')

export interface ControlsPops {
    controller: Controller
    play: () => void
    pause: () => void
}
export const Controls = (props: ControlsPops) => {
    return (
        <div className={styles.container}>
            <div className={styles.timeSlider}>
                <input type="range" min="1" max="100" defaultValue="20" className={styles.slider} />
                <div className={styles.sliderInfos}>
                    <span>4:21</span>
                    <span>-15:18</span>
                </div>
            </div>
            <div className={styles.title}>
                <span>Boku no Hero Acadomia</span>
            </div>
            <div className={styles.controls}>
                <button className={classnames(styles.button, styles.ripple)} onClick={() => this.seekBackward(5)}><i className="fa fa-backward"></i></button>
                {
                    props.controller.isPlaying ?
                        <button className={classnames(styles.button, styles.ripple)} onClick={() => props.pause()}><i className="fa fa-pause"></i></button>
                        :
                        <button className={classnames(styles.button, styles.ripple)} onClick={() => props.play()}><i className="fa fa-play"></i></button>
                }

                <button className={classnames(styles.button, styles.ripple)} onClick={() => this.seekForward(5)}><i className="fa fa-forward"></i></button>
            </div>
            <div className={styles.volumeSlider}>
                <div className={styles.mute}>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ2LjAwNCA0Ni4wMDQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ2LjAwNCA0Ni4wMDQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8cGF0aCBkPSJNMzYuNDA2LDAuNDAyYy0wLjk3Ni0wLjU1Mi0yLjEzMS0wLjUzNC0zLjA5LDAuMDQ0Yy0wLjA0NiwwLjAyNy0wLjA5LDAuMDU5LTAuMTMsMC4wOTNMMTkuNjM2LDEyLjAwMkg5LjAwMiAgYy0wLjU1MywwLTEsMC40NDctMSwxdjE5YzAsMC4yNjYsMC4xMDUsMC41MiwwLjI5MywwLjcwN3MwLjQ0MSwwLjI5MywwLjcwNywwLjI5M2wxMC42MS0wLjAwNWwxMy41NDMsMTIuNDQgIGMwLjA1LDAuMDQ2LDAuMTA0LDAuMDg2LDAuMTYxLDAuMTJjMC40OTIsMC4yOTcsMS4wMzcsMC40NDYsMS41ODIsMC40NDZjMC41MTctMC4wMDEsMS4wMzMtMC4xMzQsMS41MDgtMC40MDIgIGMwLjk5OS0wLjU2NCwxLjU5Ni0xLjU5NSwxLjU5Ni0yLjc1NlYzLjE1OEMzOC4wMDIsMS45OTcsMzcuNDA1LDAuOTY3LDM2LjQwNiwwLjQwMnogTTM2LjAwMiw0Mi44NDUgIGMwLDAuNDMxLTAuMjE3LDAuODEtMC41NzksMS4wMTVjLTAuMTU1LDAuMDg3LTAuNTQ4LDAuMjU1LTEsMC4wMjZMMjEuMDAyLDMxLjU1N3YtNC41NTZjMC0wLjU1My0wLjQ0Ny0xLTEtMXMtMSwwLjQ0Ny0xLDF2My45OTYgIGwtOSwwLjAwNHYtMTdoOXY0YzAsMC41NTMsMC40NDcsMSwxLDFzMS0wLjQ0NywxLTF2LTQuNTM2bDEzLjQwNS0xMS4zNGMwLjQ2MS0wLjI0MiwwLjg2LTAuMDcsMS4wMTYsMC4wMTggIGMwLjM2MiwwLjIwNSwwLjU3OSwwLjU4NCwwLjU3OSwxLjAxNVY0Mi44NDV6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></div>
                <div className={styles.sliderContainer}>
                    <input type="range" min="1" max="100" defaultValue="20" className={styles.slider} /></div>
                <div className={styles.volumeUp}>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyLjAyNiA1Mi4wMjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUyLjAyNiA1Mi4wMjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yOC40MDQsMy40MTNjLTAuOTc2LTAuNTUyLTIuMTMxLTAuNTM0LTMuMDksMC4wNDRjLTAuMDQ2LDAuMDI3LTAuMDksMC4wNTktMC4xMywwLjA5M0wxMS42MzQsMTUuMDEzSDEgICBjLTAuNTUzLDAtMSwwLjQ0Ny0xLDF2MTljMCwwLjI2NiwwLjEwNSwwLjUyLDAuMjkzLDAuNzA3UzAuNzM0LDM2LjAxMywxLDM2LjAxM2wxMC42MS0wLjAwNWwxMy41NDMsMTIuNDQgICBjMC4wNSwwLjA0NiwwLjEwNCwwLjA4NiwwLjE2MSwwLjEyYzAuNDkyLDAuMjk3LDEuMDM3LDAuNDQ2LDEuNTgyLDAuNDQ2YzAuNTE3LTAuMDAxLDEuMDMzLTAuMTM0LDEuNTA4LTAuNDAyICAgQzI5LjQwMyw0OC4wNDgsMzAsNDcuMDE4LDMwLDQ1Ljg1N1Y2LjE2OUMzMCw1LjAwOCwyOS40MDMsMy45NzgsMjguNDA0LDMuNDEzeiBNMjgsNDUuODU3YzAsMC40MzEtMC4yMTcsMC44MS0wLjU3OSwxLjAxNSAgIGMtMC4xNTUsMC4wODctMC41NDgsMC4yNTUtMSwwLjAyNkwxMywzNC41Njl2LTQuNTU2YzAtMC41NTMtMC40NDctMS0xLTFzLTEsMC40NDctMSwxdjMuOTk2bC05LDAuMDA0di0xN2g5djRjMCwwLjU1MywwLjQ0NywxLDEsMSAgIHMxLTAuNDQ3LDEtMXYtNC41MzZsMTMuNDA1LTExLjM0YzAuNDYxLTAuMjQyLDAuODYtMC4wNywxLjAxNiwwLjAxOEMyNy43ODMsNS4zNiwyOCw1LjczOSwyOCw2LjE2OVY0NS44NTd6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMzguNzk3LDcuMDY2Yy0wLjUyMy0wLjE3Ny0xLjA5MSwwLjEwMy0xLjI2OSwwLjYyNmMtMC4xNzcsMC41MjIsMC4xMDMsMS4wOTEsMC42MjYsMS4yNjkgICBjNy4xMDEsMi40MTEsMTEuODcyLDkuMDYzLDExLjg3MiwxNi41NTNjMCw3LjQ4My00Ljc2MiwxNC4xMzYtMTEuODQ5LDE2LjU1NGMtMC41MjIsMC4xNzgtMC44MDIsMC43NDYtMC42MjMsMS4yNyAgIGMwLjE0MiwwLjQxNSwwLjUzLDAuNjc3LDAuOTQ2LDAuNjc3YzAuMTA3LDAsMC4yMTYtMC4wMTcsMC4zMjMtMC4wNTRjNy44OTYtMi42OTMsMTMuMjAyLTEwLjEwNiwxMy4yMDItMTguNDQ2ICAgQzUyLjAyNiwxNy4xNjYsNDYuNzEsOS43NTMsMzguNzk3LDcuMDY2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTQzLjAyNiwyNS41MTNjMC01Ljk3Mi00LjAwOS0xMS4zMDItOS43NDktMTIuOTYyYy0wLjUzMy0wLjE1MS0xLjA4NCwwLjE1Mi0xLjIzOCwwLjY4NCAgIGMtMC4xNTMsMC41MywwLjE1MiwxLjA4NSwwLjY4NCwxLjIzOGM0Ljg4OSwxLjQxMyw4LjMwNCw1Ljk1Myw4LjMwNCwxMS4wNHMtMy40MTUsOS42MjctOC4zMDQsMTEuMDQgICBjLTAuNTMxLDAuMTUzLTAuODM3LDAuNzA4LTAuNjg0LDEuMjM4YzAuMTI3LDAuNDM4LDAuNTI2LDAuNzIzLDAuOTYxLDAuNzIzYzAuMDkyLDAsMC4xODUtMC4wMTMsMC4yNzctMC4wMzkgICBDMzkuMDE4LDM2LjgxNSw0My4wMjYsMzEuNDg1LDQzLjAyNiwyNS41MTN6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" /></div>
            </div>
        </div>
    )
}
