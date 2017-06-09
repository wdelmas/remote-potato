import { getCurrentPlayerByDomain } from './Player/video'
import { sendOkResponse } from "./messaging";
import { PLAYER_PLAY, PLAYER_PAUSE, message, PLAYER_SEEK_BACKWARD, PLAYER_SEEK_FORWARD } from "../../../../communication/actions";
import { getCurrentDomain } from "./browser";

export const initActions = (request: message, sender: any, sendResponse: (response: any) => void) => {
    console.log(request)
    const currentDomain = getCurrentDomain()
    const player = getCurrentPlayerByDomain(currentDomain)

    if (!player)
        console.log('player not found')
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
    }
}