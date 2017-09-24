import { getCurrentPlayerByDomain, VideoPlayer } from './Player/video'
import { sendOkResponse } from "./messaging";
import {
    PLAYER_PLAY,
    PLAYER_PAUSE,
    message,
    PLAYER_SEEK_BACKWARD,
    PLAYER_SEEK_FORWARD,
    PLAYER_VOLUME_UP,
    PLAYER_VOLUME_DOWN,
    PLAYER_ENTER_FULLSCREEN
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

    switch (request.type) {
        case PLAYER_PLAY:
            player.play()
            sendOkResponse(sendResponse)
            break
        case PLAYER_PAUSE:
            player.pause()
            sendOkResponse(sendResponse)
            break
        case PLAYER_SEEK_BACKWARD:
            player.seekBackward(parseInt(request.action))
            sendOkResponse(sendResponse)
            break
        case PLAYER_SEEK_FORWARD:
            player.seekForward(parseInt(request.action))
            sendOkResponse(sendResponse)
            break
        case PLAYER_VOLUME_UP:
            player.volumeUp(parseFloat(request.action))
            sendOkResponse(sendResponse)
            break
        case PLAYER_VOLUME_DOWN:
            player.volumeDown(parseFloat(request.action))
            sendOkResponse(sendResponse)
            break
        case PLAYER_ENTER_FULLSCREEN:
            player.enterFullScreen()
            chrome.runtime.sendMessage(request);
            sendOkResponse(sendResponse)
            break
    }
}