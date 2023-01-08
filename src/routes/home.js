import { Router } from "express";
import { getRoot } from "../controllers/user.controller.js";
import sessionAuth from "../middlewares/sessionAuth.js";

const homeRouter = new Router()

homeRouter
    .route('/')
    .get(sessionAuth, getRoot)

export default homeRouter