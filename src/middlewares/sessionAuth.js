const sessionAuth = (req, res, next) => {
    if (req.session?.name) {
        next()
    } else {
        res.redirect('/login')
    }
}

export default sessionAuth