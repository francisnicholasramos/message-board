import {Router} from "express";
import {postMessage, getMessages} from "../controller/messageController"
import {inputSchema} from "../lib/validator";

export const router = Router();

router.get("/", getMessages)

router.post("/new", inputSchema, postMessage);

