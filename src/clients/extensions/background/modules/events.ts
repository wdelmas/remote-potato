import { message, OPEN_NEW_TAB, REFRESH_TAB, REMOVE_TAB, TABS_MESSAGE_TYPE } from "../../../../communication/actions";
import { openNewTab, removeCurrentTab, refreshCurrentTab } from "./browser";

export const initTabsActions = (request: message, cb: Function): Promise<void> => {
    return Promise.resolve()
        .then(() => {
            if (request.type === TABS_MESSAGE_TYPE) {
                let result: message = {
                    from: 'extension',
                    roomId: request.roomId,
                    actionType: request.actionType,
                    type: request.type
                }
                switch (request.actionType) {
                    case OPEN_NEW_TAB:
                        openNewTab(request.action, () => {
                            cb()
                        })
                        break;
                    case REMOVE_TAB:
                        removeCurrentTab(() => {
                            cb()
                        })
                        break;
                    case REFRESH_TAB:
                        refreshCurrentTab(() => {
                            cb()
                        })
                        break

                }
            }
        })
}