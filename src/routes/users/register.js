import { Router } from "express";
import { getFailedRegister, getLogin, getRegister, postLogin, postRegister } from "../../controllers/userControllers/userControllers.js";

const registerRouter = new Router()

registerRouter
    .route('/')
    .get(getRegister)
    .post(postRegister)

registerRouter
    .route('/failed')
    .get(getFailedRegister)

export default registerRouter
