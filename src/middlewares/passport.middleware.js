import passport from 'passport'
import { Strategy } from 'passport-local'
import { usersDao as usersApi } from '../DAOs/daosIndex.js'

passport.use('login', new Strategy(
    { usernameField: 'email' },
    async (username, password, done) => {
        try {
            const user = await usersApi.authenticateUser(username, password)
            done(null, user)
        }
        catch (err) {
            done(null, false, err)
            throw err
        }
    }
))
passport.use('register', new Strategy(
    {
        passReqToCallback: true,
        usernameField: 'email',
    },
    async (req, username, password, done) => {
        try {
            const newUser = await usersApi.registerUser(req.body)
            done(null, newUser)
        }
        catch (err) {
            done(null, false, err)
            throw err
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

export const passportMiddleware = passport.initialize()
export const passportSessionHandler = passport.session()