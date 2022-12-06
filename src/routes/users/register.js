import { Router } from "express";
import { getFailedRegister, getRegister, postRegister } from "../../controllers/users.controller.js";

const registerRouter = new Router()

registerRouter
    .route('/')
    .get(getRegister)
    .post(postRegister)

registerRouter
    .route('/failed')
    .get(getFailedRegister)

export default registerRouter
