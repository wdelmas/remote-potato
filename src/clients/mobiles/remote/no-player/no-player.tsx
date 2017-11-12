import * as React from "react";
import * as classnames from 'classnames'

const MortyScared = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/morty-scared.svg')

const styles = require('./no-player.css')

export const NoPlayer = () => {
    return (
        <div className={styles.noPlayer}>
            <div className={styles.morty}>
                <MortyScared/>
            </div>
            <div className={styles.text}>
                <div className={styles.triangle}></div>
                <span>
                    Oh jeez... <br/>
                    I couldn't find a player on your current tab<br/>
                    M-m-maybe try another page ?
                </span>
            </div>
            <div className={styles.legend}>Morty - The dude looking for your players</div>
        </div>
    )
}
