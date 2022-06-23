import { PcreateReqDto } from '../DTO/patientDto';
import { PupdateReqDto } from '../DTO/patientDto';
import { PgetReqDto } from '../DTO/patientDto';
import { PRupdateReqDto } from '../DTO/patientDto';
import Patient from '../models/Patient';
import { IPatient } from '../models/Patient';
export class PatientRepository {
    public readonly db = Patient;

    async CreatePatient(patientData: PcreateReqDto) {
        return this.db.create(patientData);
    }

    async findOnePatient(patientData: PgetReqDto) {
        return this.db.findById(patientData._id).populate('records').exec();
    }

    async updateOnePatient(patientData: PupdateReqDto) {
        const patient = await this.db.findById(patientData._id);

        if (!patient) {
            throw new Error('patient does not exist');
        }
        if (patientData.firstname) {
            patient.firstname = patientData.firstname;
        }
        if (patientData.lastname) {
            patient.lastname = patientData.lastname;
        }
        if (patientData.telephone) {
            patient.telephone = patientData.telephone;
        }
        if (patientData.dob) {
            patient.dob = patientData.dob;
        }
        if (patientData.sex) {
            patient.sex = patientData.sex;
        }

        patient.save();
        return patient;
    }

    async updatePatientrecord(patientData: PRupdateReqDto) {
       return await this.db.findByIdAndUpdate(patientData._id, { $push: { records: patientData.records } }, { upsert: true })
  
    }

    async AllPatients() {
        return this.db.find();
    }

    async deleteOnePatient(patientData: PgetReqDto) {
        return this.db.findByIdAndDelete(patientData._id);
    }
}
