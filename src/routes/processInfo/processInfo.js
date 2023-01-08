import { Router } from "express";
import { getProcessInfo } from "../../controllers/processInfo.controller.js";

const processInfoRouter = new Router()

processInfoRouter
    .route('/')
    .get(getProcessInfo)

export default processInfoRouter