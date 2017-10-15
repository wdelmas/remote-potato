import { getCurrentPlayerByDomain, VideoPlayer } from './video'
import { sendOkResponse } from "./messaging";
import {
    PLAYER_PLAY,
    PLAYER_PAUSE,
    message,
    PLAYER_SEEK_BACKWARD,
    PLAYER_SEEK_FORWARD,
    CHANGE_VOLUME,
    PLAYER_ENTER_FULLSCREEN,
    PLAYER_EXIT_FULLSCREEN,
    PLAYER_FOUND,
    HANDSHAKE,
    GO_TO_TIME
} from "../../../../communication/actions";
import { getCurrentDomain } from "./browser";
import { Debugger } from "../../../../communication/Debugger";

let player: VideoPlayer = null
let findPlayerTry = 0
const MAX_PLAYER_SEARCHED = 1

export const initActions = (request: message, sender: any): Promise<message> => {
    return Promise.resolve()
        .then(() => {

            if (!player && findPlayerTry < MAX_PLAYER_SEARCHED) {
                const currentDomain = getCurrentDomain()
                player = getCurrentPlayerByDomain(currentDomain)
                findPlayerTry++
            }
            if (!player)
                return
            Debugger.log(request)
            let result: message = {
                from: 'extension',
                extensionId: request.extensionId,
                type: request.type
            }
            switch (request.type) {
                case PLAYER_PLAY:
                    player.play()
                    break
                case PLAYER_PAUSE:
                    player.pause()
                    break
                case GO_TO_TIME:
                    player.goToTime(parseInt(request.action))
                    break
                case PLAYER_SEEK_BACKWARD:
                    player.seekBackward(parseInt(request.action))
                    break
                case PLAYER_SEEK_FORWARD:
                    player.seekForward(parseInt(request.action))
                    break
                case CHANGE_VOLUME:
                    result.action = `${player.changeVolume(parseFloat(request.action))}`
                    break
                case PLAYER_ENTER_FULLSCREEN:
                    player.enterFullScreen()
                    request.extensionId = null
                    chrome.runtime.sendMessage(request);
                    break
                case PLAYER_EXIT_FULLSCREEN:
                    player.exitFullScreen();
                    request.extensionId = null
                    chrome.runtime.sendMessage(request);
                    break
            }

            if (request.type! === HANDSHAKE) {
                player.setFeedBackAction(request.type);
            }
            return player.getResponse()
                .then((playInfo) => {
                    result.infos = playInfo

                    return result
                })
        })

}