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
    let result: message = null
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
            result = {
                extensionId: request.extensionId,
                action: `${player.volumeUp(parseFloat(request.action))}`,
                type: 'PLAYER_VOLUME_UP'
            }
            sendResponse(result)
            break
        case PLAYER_VOLUME_DOWN:
            result = {
                extensionId: request.extensionId,
                action: `${player.volumeDown(parseFloat(request.action))}`,
                type: 'PLAYER_VOLUME_DOWN'
            }
            sendResponse(result)
            break
        case PLAYER_ENTER_FULLSCREEN:
            player.enterFullScreen()
            chrome.runtime.sendMessage(request);
            sendOkResponse(sendResponse)
            break
        case PLAYER_EXIT_FULLSCREEN:
            player.exitFullScreen();
            chrome.runtime.sendMessage(request);
            sendOkResponse(sendResponse);
            break
    }
}