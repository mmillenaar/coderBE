import passport from 'passport'
import { Strategy } from 'passport-local'
import logger from '../config/logger.config.js'
import usersApi from '../services/users.api.js'
import { sendMailOnRegister } from '../utils/sendMails.js'

passport.use('login', new Strategy(
    { usernameField: 'email' },
    async (username, password, done) => {
        try {
            const user = await usersApi.authenticateUser(username, password)
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
            const newUser = req.body
            newUser.cart = { timestamp: Date.now(), products: [] }
            const registeredUser = await usersApi.registerUser(newUser)
            await sendMailOnRegister(registeredUser)
            done(null, registeredUser)
        }
        catch (err) {
            logger.error(err)
            done(null, false, err)
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