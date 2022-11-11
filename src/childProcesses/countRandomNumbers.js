const randomNumber = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1)
}

const countRandomNumbers = (quantity) => {
    let numbers = []
    // for (let i = 0; i < quantity; i++) {
    //     numbers.push(randomNumber())
    // }
    const numberCount = {}
    // numbers.forEach(number => {
    //     numberCount[number] = numberCount[number] ? numberCount[number]++ : 1
    // })
    return numberCount
}

process.on('exit', () => {
    console.log('countRandomNumbers process finished');
})

process.on('message', msg => {
    if (msg.type === 'start') {
        console.log('countRandomNumbers process started');
        const numbersObject = countRandomNumbers(msg.data)
        process.send(numbersObject)
        process.exit()
    }
})