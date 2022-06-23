"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const PatientController_1 = __importDefault(require("../controllers/PatientController"));
const verifytoken_1 = require("../middleware/verifytoken");
const router = express_1.default.Router();
//patient functions
router.post('/create', verifytoken_1.TokenValidation, PatientController_1.default.createPatient);
router.get('/get/:patientId', PatientController_1.default.readPatient);
router.get('/get/', PatientController_1.default.readAllPatient);
router.patch('/update/:patientId', PatientController_1.default.updatePatient);
router.delete('/delete/:patientId', PatientController_1.default.deletePatient);
//record functions
router.put('/update/records/:patientId', PatientController_1.default.createRecords);
router.get('/get/records/:patientId', PatientController_1.default.getpatientrec);
router.get('/get/search', PatientController_1.default.searchpatient);
module.exports = router;
