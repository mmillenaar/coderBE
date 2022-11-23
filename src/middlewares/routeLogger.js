import logger from "../config/logger.js"

const routeLogger = (req, res, next) => {
    logger.info('Method %s requested in route %O', req.method, req.originalUrl)
    next()
}

export default routeLogger