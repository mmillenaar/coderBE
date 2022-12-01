import pino, { multistream } from 'pino'
import path from 'path'

const streams = [
    {
        level: 'info',
        stream: process.stdout
    },
    {
        level: 'error'
        , stream: pino.destination(path.resolve('./logs/error.log'))
    }
]

const logger = pino(
    {
        level: 'info',
        transport: {
            target: 'pino-pretty'
        },
    },
    multistream(streams),
)

export default logger
