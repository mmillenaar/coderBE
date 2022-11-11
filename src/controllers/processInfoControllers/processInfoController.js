import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import os from 'os'

const args = yargs(hideBin(process.argv))

export const getProcessInfo = (req, res) => {
    const argumentsObjectEntries = Object.entries(args.argv)
    const processData = {
        entryArguments: argumentsObjectEntries,
        execPath: process.execPath,
        OS: process.platform,
        processId: process.pid,
        nodeVersion: process.version,
        folder: process.cwd(),
        memoryUsage: process.memoryUsage().rss,
        processors: os.cpus().length
    }
    res.render(path.resolve('./views/pages/info.handlebars'), {processData})
}
