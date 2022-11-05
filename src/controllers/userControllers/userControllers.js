import path from 'path'
import passport from 'passport'

export const getRoot = (req, res) => {
    res.render(path.resolve('./views/pages/index.handlebars'), { name: req.user.name })
}
export const getLogin = (req, res) => {
    const user = req.isAuthenticated()
    if (user) {
        res.redirect('/')
    }
    else {
        res.sendFile(path.resolve('./views/pages/login.html'))
    }
}
export const postLogin = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login/failed'
})
export const getFailedLogin = (req, res) => {
    res.sendFile(path.resolve('./views/pages/failedlogin.html'))
}
export const getRegister = (req, res) => {
    res.sendFile(path.resolve('./views/pages/register.html'))
}
export const postRegister = passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register/failed'
})
export const getFailedRegister = (req, res) => {
    res.sendFile(path.resolve('./views/pages/failedregister.html'))
}
export const getLogout = (req, res) => {
    const name = req.user.name
    req.logout(err => {
        if (err) {
            throw err
        }
        else {
            res.render(path.resolve('./views/pages/logout.handlebars'), { name: name })
        }
    });
}