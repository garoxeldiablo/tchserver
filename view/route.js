import { login } from "../controller/controller.js";
import express from 'express'

export const router = express.Router();

router.post('/signin', login);
