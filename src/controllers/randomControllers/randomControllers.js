import { fork } from 'child_process'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const getRandomNumbers = (req, res) => {
    let quantity = 100000000
    if (req.query.quantity >= 1) {
        quantity = JSON.parse(req.query.quantity)
    }
    const randomNumbers = fork(path.resolve('./src/childProcesses/countRandomNumbers.js'))
    randomNumbers.send({type: 'start', data: quantity})
    randomNumbers.on('message', result => {
        // res.send(result)

        // ===> to check server redirect with nginx

        const args = yargs(hideBin(process.argv))
        args
            .default({
                port: 8080,
                mode: 'fork',
            })
            .alias({
                p: 'port',
                m: 'mode'
            })
            .argv

        res.json(args.argv.port)
    })
}