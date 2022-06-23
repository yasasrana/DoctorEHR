import express from 'express';
import DoctorController from '../controllers/DoctorController';

const router = express.Router();

router.post('/register', DoctorController.createDoctor);
router.post('/login', DoctorController.login);

export = router;
