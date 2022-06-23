import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Patient from '../models/Patient';
import Records from '../models/Records';
import { PatientService } from '../services/patient';

//create patient and record

const createPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /*   const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const telephone = req.body.telephone;
        const dob = req.body.dob;
        const sex = req.body.sex;
        const complaint = req.body.complaint;
        const bloodpressure = req.body.bloodpressure;
        const pulse = req.body.pulse;
        const weight = req.body.weight;
        const illness = req.body.illness;
        const Treatment = req.body.Treatment; */
        /*  const records = await Records.create({
            complaint,
            bloodpressure,
            pulse,
            weight,
            illness,
            Treatment
        });

        const patient = await Patient.create({
            firstname,
            lastname,
            telephone,
            dob,
            sex,
            records: [records._id]
        }); */
        /*  res.status(201).json({ patient, records }); */
    } catch (error) {
        res.status(500).json({ error });
    }
};

//get patient records
const getpatientrec = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;

        //  const patient = await Patient.findById(patientId);

        Patient.findById(patientId)
            .populate('records')
            .exec((err, patient) => {
                res.status(200).json({ patient });
            });

        //patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

//create Records
const createRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const complaint = req.body.complaint;
        const bloodpressure = req.body.bloodpressure;
        const pulse = req.body.pulse;
        const weight = req.body.weight;
        const illness = req.body.illness;
        const Treatment = req.body.Treatment;
        const patientId = req.params.patientId;

        const records = await Records.create({
            complaint,
            bloodpressure,
            pulse,
            weight,
            illness,
            Treatment
        });

        const patient = Patient.findByIdAndUpdate(patientId, { $push: { records: records._id } }, { upsert: true }, (err, doc) => {
            if (err) {
                res.status(500).json('Something wrong when updating data!');
            }
            res.status(200).json('records updated successfully');
        });
        // console.log(callback)
        //  const patient = await Patient.findById(patientId);
    } catch (error) {
        res.status(500).json({ error });
    }
};

//get patient
const readPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;

        const patient = await Patient.findById(patientId);

        patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patients = await Patient.find();

        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({ error });
    }
};

//update patient
const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;

        const patient = await Patient.findById(patientId);

        if (patient) {
            patient.set(req.body);
            patient.save();
            res.status(200).json({ patient });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

//delete patient
const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;

        const patient = await Patient.findByIdAndDelete(patientId);

        patient ? res.status(200).json({ message: 'patient deleted' }) : res.status(404).json({ message: 'Patient not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

//search patient
const searchpatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientname = req.body.patientname;

        Patient.find({ firstname: patientname }).exec((err, patients) => {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json({ patients });
            }
        });

        //  patients ? res.status(200).json({ patients }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createPatient, readAllPatient, searchpatient, readPatient, updatePatient, deletePatient, createRecords, getpatientrec };
