import pino, { multistream } from 'pino'
import pretty from 'pino-pretty'
import path from 'path'

const streams = [
    {
        stream: pretty()
    },
    {
        level: 'warn',
        stream: pino.destination(path.resolve('./logs/warn.log'))
    },
    {
        level: 'error',
        stream: pino.destination(path.resolve('./logs/error.log'))
    }
]

const logger = pino(
    {
        level: 'info',
    },
    multistream(streams),
)

export default logger