import Doctor from '../models/Doctor';
import { DloginReqDto } from '../DTO/doctorDto';

export class DoctorRepository {
    public readonly db = Doctor;

    async CreateDoctor(doctorData: DloginReqDto) {
        return this.db.create(doctorData);
    }

    async findDoctor(doctorData: DloginReqDto) {
    
        return this.db.find({username:doctorData.username});
    }

}