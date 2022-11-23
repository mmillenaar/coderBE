import pino, { multistream } from 'pino'
import path from 'path'

const streams = [
    {
        level: 'warn',
        stream: pino.destination(path.resolve('./logs/warn.log'))
    },
    {
        level: 'error',
        stream: pino.destination(path.resolve('./logs/error.log'))
    },
    {
        stream: process.stdout
    },
]
const logger = pino(
    { level: 'info' },
    multistream(streams)
)

export default logger