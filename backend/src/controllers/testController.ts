import { PcreateReqDto } from '../DTO/patientDto';
import { PgetReqDto } from '../DTO/patientDto';
import { PRupdateReqDto } from '../DTO/patientDto';
import { PupdateReqDto } from '../DTO/patientDto';
import { PatientRepository } from '../repository/patientrepo';
import { PatientService } from '../services/patient';
import { NextFunction, Request, Response } from 'express';
import { RcreateReqDto } from '../DTO/recordsDto';
import { RecordsRepository } from '../repository/reacordsrepo';
import { RecordsService } from '../services/records';
import Patient from '../models/Patient';

const patientService: PatientService = new PatientService(new PatientRepository());
const recordService: RecordsService = new RecordsService(new RecordsRepository());

const testFunc = async (req: Request, res: Response) => {
    console.log('test');
    const { firstname, lastname, telephone, dob, sex, complaint, bloodpressure, pulse, weight, illness, Treatment } = req.body;

    //let pcreateReqDto: PcreateReqDto = new PcreateReqDto('test', 'test', '011', '2020', 'male','[test]',);
    let rcreateReqDto: RcreateReqDto = new RcreateReqDto(Treatment, complaint, illness, pulse, bloodpressure, weight);

    const record = await recordService.createR(rcreateReqDto);

    console.log(record._id);

    let pcreateReqDto: PcreateReqDto = new PcreateReqDto(firstname, lastname, telephone, dob, sex, record._id);

    const patient = await patientService.createP(pcreateReqDto);

    res.status(201).json({
        patient,
        record
    });
};

const Addrecord = async (req: Request, res: Response) => {
    const { complaint, bloodpressure, pulse, weight, illness, Treatment } = req.body;

    let rcreateReqDto: RcreateReqDto = new RcreateReqDto(Treatment, complaint, illness, pulse, bloodpressure, weight);

    const record = await recordService.createR(rcreateReqDto);

    console.log(record);

    const patientId = req.params.patientId;

    let pRupdateReqDto: PRupdateReqDto = new PRupdateReqDto(patientId, record._id);

    const patient = await patientService.updatePatientrecord(pRupdateReqDto);

    res.status(201).json({
        patient,
        record
    });
};

const readPatient = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.patientId;

        let pgetReqDto: PgetReqDto = new PgetReqDto(patientId);

        const patient = await patientService.findOnePatient(pgetReqDto);

        patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updatePatient = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.patientId;
        const { firstname, lastname, telephone, dob, sex } = req.body;

        let pupdateReqDto: PupdateReqDto = new PupdateReqDto(patientId, firstname, lastname, telephone, dob, sex);

        const patient = await patientService.updateOnePatient(pupdateReqDto);

        patient ? res.status(200).json({ patient }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await patientService.findAllPatients();

        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deletePatient = async (req: Request, res: Response) => {
    try {
        const patientId = req.params.patientId;

        let pgetReqDto: PgetReqDto = new PgetReqDto(patientId);

        const patient = await patientService.deleteOnePatient(pgetReqDto);

        patient ? res.status(200).json({ message: 'patient deleted' }) : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const search = async (req: Request, res: Response) => {
    try {
        let result = await Patient.aggregate([
            {
                $search: {
                    autocomplete: {
                        query: `${req.query.term}`,
                        path: 'firstname',
                        fuzzy: {
                            maxEdits: 2
                        }
                    }
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { search, testFunc, readPatient, readAllPatients, updatePatient, deletePatient, Addrecord };
