import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import {checkAuth, getAdmin, getProfile, loginUser, logoutUser, postPayment, putAdmin, registerUser, test} from '../controllers/authController.js'
import { get } from 'mongoose';

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/pay', postPayment)
router.get('/admin', getAdmin)
router.put('/admin/:id', putAdmin)
router.post('/logout', logoutUser);
router.get('/check-auth', checkAuth);

export default router