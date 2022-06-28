import express from 'express';
import PatientController from '../controllers/PatientController';
import { TokenValidation } from '../middleware/verifytoken';
import controller from '../controllers/testController';
import { PcreateReqDto } from '../DTO/patientDto';
const router = express.Router();

//patient functions
router.post('/create', TokenValidation, controller.testFunc);
router.get('/get/:patientId',TokenValidation, controller.readPatient);
router.get('/get/',TokenValidation, controller.readAllPatients);
router.patch('/update/:patientId',TokenValidation, controller.updatePatient);
router.delete('/delete/:patientId',TokenValidation, controller.deletePatient);

//record functions
router.post('/records/:patientId', TokenValidation,controller.Addrecord);

router.get('/search', controller.search);
//router.get('/get/records/:patientId', PatientController.getpatientrec);
//router.get('/get/search', PatientController.searchpatient);

export = router;
