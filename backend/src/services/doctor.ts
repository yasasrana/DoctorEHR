import { DloginReqDto } from '../DTO/doctorDto';
import { DoctorRepository } from '../repository/doctorrepo';
import { DloginResDto } from '../DTO/doctorDto';

export class DoctorService {
    constructor(public doctorrepo: DoctorRepository) {}

    async createD(Data: DloginReqDto) {
        const doctor = await this.doctorrepo.CreateDoctor(Data);

        return DloginResDto.from(doctor);
    }
    async findD(Data: DloginReqDto) {
        const doctor = await this.doctorrepo.findDoctor(Data);

        return (doctor);
    }
}