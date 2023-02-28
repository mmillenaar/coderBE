import { Router } from "express";
import { getFailedLogin, getLogin, postLogin } from "../../controllers/users.controller.js";

const loginRouter = new Router()

loginRouter
    .route('/')
    .get(getLogin)
    .post(postLogin)

loginRouter
    .route('/failed')
    .get(getFailedLogin)

export default loginRouter