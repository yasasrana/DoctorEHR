"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const DoctorController_1 = __importDefault(require("../controllers/DoctorController"));
const router = express_1.default.Router();
router.post('/register', DoctorController_1.default.createDoctor);
router.post('/login', DoctorController_1.default.login);
module.exports = router;
