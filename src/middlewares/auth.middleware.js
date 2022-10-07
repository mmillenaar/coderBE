const authValidator = (isAdmin) => {
    return authValidator[isAdmin] || (authValidator[isAdmin] = (req, res, next) => {
        if (isAdmin) {
            next()
        } else {
            res.status(401).send(`Unauthorized method:${req.method} in route:${req.originalUrl}`)
        }
    })
}
export default authValidator