import { Router } from "express";
import { getRoot } from "../../controllers/users.controller.js";
import sessionAuth from "../../middlewares/sessionAuth.middleware.js";

const homeRouter = new Router()

homeRouter
    .route('/')
    .get(sessionAuth, getRoot)

export default homeRouter