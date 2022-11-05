import { fork } from 'child_process'
import path from 'path'

export const getRandomNumbers = (req, res) => {
    let quantity = 100000000
    if (req.query.quantity >= 1) {
        quantity = JSON.parse(req.query.quantity)
    }
    const randomNumbers = fork(path.resolve('./src/childProcesses/countRandomNumbers.js'))
    randomNumbers.send({type: 'start', data: quantity})
    randomNumbers.on('message', result => {
        res.send(result)
    })
}