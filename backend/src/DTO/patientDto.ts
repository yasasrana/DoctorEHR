import { IPatient } from '../models/Patient';
export class PcreateReqDto {
    constructor(
        public readonly firstname: string | undefined,
        public readonly lastname: string | undefined,
        public readonly telephone: string | undefined,
        public readonly dob: string | undefined,
        public readonly sex: string | undefined,
        public readonly records: Array<string> | undefined
    ) {}

    static from(body: Partial<PcreateReqDto>): PcreateReqDto {
        return new PcreateReqDto(body.firstname, body.lastname, body.telephone, body.dob, body.sex, body.records);
    }

    static fromMany(patients: IPatient[]) {
        return patients.map((patient) => PcreateReqDto.from(patient));
    }
}

export class PgetReqDto {
    constructor(public readonly _id: string | undefined) {}

    static from(params: Partial<PgetReqDto>): PgetReqDto {
        return new PgetReqDto(params._id);
    }
}

export class PupdateReqDto {
    constructor(
        public readonly _id: string | undefined,
        public readonly firstname: string | undefined,
        public readonly lastname: string | undefined,
        public readonly telephone: string | undefined,
        public readonly dob: string | undefined,
        public readonly sex: string | undefined
    ) {}

    static from(data: Partial<PupdateReqDto>): PupdateReqDto {
        return new PupdateReqDto(data._id, data.firstname, data.lastname, data.telephone, data.dob, data.sex);
    }
}

export class PRupdateReqDto {
    constructor(
        public readonly _id: string | undefined,

        public readonly records: Array<string> | undefined
    ) {}

    static from(data: Partial<PRupdateReqDto>): PRupdateReqDto {
        return new PRupdateReqDto(data._id, data.records);
    }
}
