import { getCurrentPlayerByDomain, VideoPlayer } from './video'
import { sendOkResponse } from "./messaging";
import {
    PLAYER_PLAY,
    PLAYER_PAUSE,
    message,
    PLAYER_SEEK_BACKWARD,
    PLAYER_SEEK_FORWARD,
    PLAYER_VOLUME_UP,
    PLAYER_VOLUME_DOWN,
    PLAYER_ENTER_FULLSCREEN,
    PLAYER_EXIT_FULLSCREEN
} from "../../../../communication/actions";
import { getCurrentDomain } from "./browser";
import { Debugger } from "../../../../communication/Debugger";

let player: VideoPlayer = null
let findPlayerTry = 0
const MAX_PLAYER_SEARCHED = 1

export const initActions = (request: message, sender: any, sendResponse: (response: any) => void) => {
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
        case PLAYER_SEEK_BACKWARD:
            player.seekBackward(parseInt(request.action))
            break
        case PLAYER_SEEK_FORWARD:
            player.seekForward(parseInt(request.action))
            break
        case PLAYER_VOLUME_UP:
            result.action = `${player.volumeUp(parseFloat(request.action))}`
            break
        case PLAYER_VOLUME_DOWN:
            result.action = `${player.volumeDown(parseFloat(request.action))}`
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
    player.setFeedBackAction(request.type);
    result.infos = player.getResponse()
    sendOkResponse(sendResponse, {
        result
    })
}