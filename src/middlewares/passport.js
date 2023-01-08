import passport from 'passport'
import { Strategy } from 'passport-local'
import logger from '../config/logger.js'
import usersApi, { authenticateUser, registerUser } from '../services/users.api.js'

passport.use('login', new Strategy(
    { usernameField: 'email' },
    async (username, password, done) => {
        try {
            const user = await authenticateUser(username, password)
            done(null, user)
        }
        catch (err) {
            logger.error(err)
            done(null, false, err)
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
            const newUser = await registerUser(req.body)
            done(null, newUser)
        }
        catch (err) {
            logger.error(err)
            done(null, false, err)
        }
    }))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

export const passportMiddleware = passport.initialize()
export const passportSessionHandler = passport.session()