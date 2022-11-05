import { Router } from "express";
import { getLogout } from "../../controllers/userControllers/userControllers.js";

const logoutRouter = new Router()

logoutRouter
    .route('/')
    .get(getLogout)

export default logoutRouter