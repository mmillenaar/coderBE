import { Router } from "express";
import { getRandomNumbers } from "../../controllers/random.controller.js";

const randomsApiRouter = new Router()

randomsApiRouter
    .route('/')
    .get(getRandomNumbers)

export default randomsApiRouter