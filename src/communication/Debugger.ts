
interface Logger {
    error(message?: any, ...optionalParams: any[]): void
    info(message?: any, ...optionalParams: any[]): void
    log(message?: any, ...optionalParams: any[]): void
    warn(message?: any, ...optionalParams: any[]): void
}

function create() {
    let logger: Logger = console

    function reset(options: { logger?: Logger }) {
        logger = options.logger || logger
    }

    function log(...args: any[]): void {
        logger.log.apply(logger, args)
    }

    function info(...args: any[]): void {
        logger.info.apply(logger, args)
    }

    function warn(...args: any[]): void {
        logger.warn.apply(logger, args)
    }

    function error(...args: any[]): void {
        logger.error.apply(logger, args)
    }

    return {
        reset,
        log,
        info,
        warn,
        error
    }
}

const Debugger = create()

export {
    Logger,
    Debugger
}
export default Debugger
