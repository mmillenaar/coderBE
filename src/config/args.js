import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const args = yargs(hideBin(process.argv))
args
    .default({
        port: 8080,
        mode: 'fork',
        persistence: 'mongo',
    })
    .alias({
        p: 'port',
        m: 'mode',
        pers: 'persistence',
    })
    .argv

export const PORT = args.argv.port
export const MODE = args.argv.mode
export const PERS = args.argv.persistence