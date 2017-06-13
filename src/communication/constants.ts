declare const WEBPACK_HOST: string;
export const HOST_WILLIAM = '127.0.0.1'// '10.1.38.61'
export const HOST_DAVID = '192.168.1.97'
export const EXT_ID = 'hllblcmblpjpoefmopbcnfgncdjmceel'
export const HOST = WEBPACK_HOST || HOST_WILLIAM
export const PORT = 3002
export const IO_SERVER = `http://${HOST}:${PORT}`
export const MESSAGE_FROM_CLIENT = 'MESSAGE_FROM_CLIENT'
export const MESSAGE_TO_EXTENSION = 'MESSAGE_TO_EXTENSION'
export const MESSAGE_FROM_EXTENSION = 'MESSAGE_FROM_EXTENSION'
export const MESSAGE_FROM_SERVER = 'MESSAGE_FROM_SERVER'