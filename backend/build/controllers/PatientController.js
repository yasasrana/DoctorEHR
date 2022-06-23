"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = __importDefault(require("../models/Patient"));
const Records_1 = __importDefault(require("../models/Records"));
//create patient and record
const createPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const telephone = req.body.telephone;
        const dob = req.body.dob;
        const sex = req.body.sex;
        const complaint = req.body.complaint;
        const bloodpressure = req.body.bloodpressure;
        const pulse = req.body.pulse;
        const weight = req.body.weight;
        const illness = req.body.illness;
        const Treatment = req.body.Treatment;
        const records = yield Records_1.default.create({
            complaint,
            bloodpressure,
            pulse,
            weight,
            illness,
            Treatment
        });
        const patient = yield Patient_1.default.create({
            firstname,
            lastname,
            telephone,
            dob,
            sex,
            records: [records._id]
        });
        res.status(201).json({ patient, records });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
//get patient records
const getpatientrec = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        //  const patient = await Patient.findById(patientId);
        Patient_1.default.findById(patientId)
            .populate('records')
            .exec((err, patient) => {
            res.status(200).json({ patient });
        });
        //patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
//create Records
const createRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaint = req.body.complaint;
        const bloodpressure = req.body.bloodpressure;
        const pulse = req.body.pulse;
        const weight = req.body.weight;
        const illness = req.body.illness;
        const Treatment = req.body.Treatment;
        const patientId = req.params.patientId;
        const records = yield Records_1.default.create({
            complaint,
            bloodpressure,
            pulse,
            weight,
            illness,
            Treatment
        });
        const patient = Patient_1.default.findByIdAndUpdate(patientId, { $push: { records: records._id } }, { upsert: true }, (err, doc) => {
            if (err) {
                res.status(500).json('Something wrong when updating data!');
            }
            res.status(200).json('records updated successfully');
        });
        // console.log(callback)
        //  const patient = await Patient.findById(patientId);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
//get patient
const readPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        const patient = yield Patient_1.default.findById(patientId);
        patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
const readAllPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield Patient_1.default.find();
        res.status(200).json({ patients });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
//update patient
const updatePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        const patient = yield Patient_1.default.findById(patientId);
        if (patient) {
            patient.set(req.body);
            patient.save();
            res.status(200).json({ patient });
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
//delete patient
const deletePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        const patient = yield Patient_1.default.findByIdAndDelete(patientId);
        patient ? res.status(200).json({ message: 'patient deleted' }) : res.status(404).json({ message: 'Patient not found' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
//search patient
const searchpatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientname = req.body.patientname;
        Patient_1.default.find({ firstname: patientname }).exec((err, patients) => {
            if (err) {
                res.json(err);
            }
            else {
                res.status(200).json({ patients });
            }
        });
        //  patients ? res.status(200).json({ patients }) : res.status(404).json({ message: 'Not found' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.default = { createPatient, readAllPatient, searchpatient, readPatient, updatePatient, deletePatient, createRecords, getpatientrec };
