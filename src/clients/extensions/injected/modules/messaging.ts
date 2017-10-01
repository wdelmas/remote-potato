import { message } from "../../../../communication/actions";

export const sendOkResponse = (sendResponse: any, options: {
    result: message
}) => {
    sendResponse(options.result)
}