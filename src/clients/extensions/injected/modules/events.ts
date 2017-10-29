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
    GO_TO_TIME,
    COMMONS_MESSAGE_TYPE,
    PLAYER_ACTIONS_MESSAGE_TYPE
} from "../../../../communication/actions";
import { getCurrentDomain } from "./browser";
import { Debugger } from "../../../../communication/Debugger";

let player: VideoPlayer = null
let findPlayerTry = 0
const MAX_PLAYER_SEARCHED = 1

export const initActions = (request: message, sender: any): Promise<message | void> => {
    return Promise.resolve()
        .then(() => {
            if (request.type === PLAYER_ACTIONS_MESSAGE_TYPE || request.type === COMMONS_MESSAGE_TYPE) {

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
                    roomId: request.roomId,
                    type: request.type,
                    actionType: request.actionType
                }

                if (request.actionType! === HANDSHAKE) {
                    player.setFeedBackAction(request.actionType);
                }

                switch (request.actionType) {
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
                        chrome.runtime.sendMessage(request);
                        break
                    case PLAYER_EXIT_FULLSCREEN:
                        player.exitFullScreen();
                        chrome.runtime.sendMessage(request);
                        break
                }

               
                return player.getResponse()
                    .then((playInfo) => {
                        result.infos = playInfo

                        return result
                    })
            }
        })

}