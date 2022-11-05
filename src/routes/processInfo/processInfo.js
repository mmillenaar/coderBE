import { Router } from "express";
import { getProcessInfo } from "../../controllers/processInfoControllers/processInfoController.js";

const processInfoRouter = new Router()

processInfoRouter
    .route('/')
    .get(getProcessInfo)

export default processInfoRouter