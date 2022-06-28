import { PcreateReqDto } from '../DTO/patientDto';
import { PgetReqDto } from '../DTO/patientDto';
import { PRupdateReqDto } from '../DTO/patientDto';
import { PcreateResDto } from '../DTO/patientDto';
import { PupdateReqDto } from '../DTO/patientDto';
import { PatientRepository } from '../repository/patientrepo';
import { IPatient } from '../models/Patient';
export class PatientService {
    constructor(public patientRepo: PatientRepository) {}

    async createP(patientData: PcreateReqDto) {
        const patient = await this.patientRepo.CreatePatient(patientData);

        return  PcreateResDto.from(patient);
    }

    async findOnePatient(id: PgetReqDto) {
        const patient = await this.patientRepo.findOnePatient(id);

        if (patient) {
            return PcreateResDto.from(patient);
        } else {
            return patient;
        }
    }

    async updateOnePatient(patientData: PupdateReqDto) {
        const patient = await this.patientRepo.updateOnePatient(patientData);

        if (patient) {
            return PupdateReqDto.from(patient);
        } else {
            return patient;
        }
    }

    async updatePatientrecord(patientData: PRupdateReqDto) {
        const patient = await this.patientRepo.updatePatientrecord(patientData);

       
            return patient;
        
    }

    async findAllPatients() {
        const patients = await this.patientRepo.AllPatients();

        if (patients) {
            return  PcreateResDto.fromMany(patients);
        } else {
            return patients;
        }
    }

    async deleteOnePatient(id: PgetReqDto) {
        const patient = await this.patientRepo.deleteOnePatient(id);

        return patient;
    }
}
