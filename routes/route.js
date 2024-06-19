import express from "express";
import { getUsers, login, logout, register } from '../controller/Users.js';
import { detTeknisi, getTeknisi } from "../controller/Teknisi.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/users', verifyToken, getUsers);
router.get('/token', refreshToken);
router.get('/teknisi', getTeknisi)
router.get('/teknisi/:id', detTeknisi);


router.delete('/logout', logout);

export default router;