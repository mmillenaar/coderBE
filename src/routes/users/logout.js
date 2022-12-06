import { Router } from "express";
import { getLogout } from "../../controllers/users.controller.js";

const logoutRouter = new Router()

logoutRouter
    .route('/')
    .get(getLogout)

export default logoutRouter