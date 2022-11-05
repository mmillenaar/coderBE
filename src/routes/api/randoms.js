import { Router } from "express";
import { getRandomNumbers } from "../../controllers/randomControllers/randomControllers.js";

const randomsApiRouter = new Router()

randomsApiRouter
    .route('/')
    .get(getRandomNumbers)

export default randomsApiRouter