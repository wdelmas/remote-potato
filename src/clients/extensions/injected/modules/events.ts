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
import { getCurrentDomain, addKeyboardListeners } from "./browser";
import { Debugger } from "../../../../communication/Debugger";

let player: VideoPlayer = null
let findPlayerTry = 0
const MAX_PLAYER_SEARCHED = 1

export const initActions = (request: message, sender: any): Promise<message | void> => {
    return Promise.resolve()
        .then(() => {
            if (request.type === COMMONS_MESSAGE_TYPE){
                if (!player && findPlayerTry < MAX_PLAYER_SEARCHED) {
                    const currentDomain = getCurrentDomain()
                    player = getCurrentPlayerByDomain(currentDomain)
                    findPlayerTry++
                }
                if (!player) return returnNoPlayer(request);
                addKeyboardListeners();
                return returnPlayerInfos(request);
            } else if (request.type === PLAYER_ACTIONS_MESSAGE_TYPE ) {
                if (!player) return
                
                Debugger.log(request)
                
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
                        player.changeVolume(parseFloat(request.action));
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

                player.setFeedBackAction(request.actionType);
               
                return returnPlayerInfos(request);
            }
        })

}

const returnNoPlayer = (request: message): Promise<message | void> => {
    let result: message = {
        from: 'extension',
        roomId: request.roomId,
        type: request.type,
        actionType: request.actionType
    };

    return Promise.resolve()
        .then(() => {
            result.infos = null
            return result
        });
}

const returnPlayerInfos = (request: message): Promise<message | void> => {
    let result: message = {
        from: 'extension',
        roomId: request.roomId,
        type: request.type,
        actionType: request.actionType
    };

    return player.getResponse()
        .then((playInfo) => {
            result.infos = playInfo

            return result
        });
}