import { IDoctor } from '../models/Doctor';
export class DloginResDto {
    constructor(public readonly _id: string | undefined, public readonly username: string | undefined) {}

    static from(body: Partial<DloginResDto>): DloginResDto {
        return new DloginResDto(body._id, body.username);
    }
}

export class DloginReqDto {
    constructor(public readonly username: string | undefined,
         public readonly password: string | undefined) {}

    static from(body: Partial<DloginReqDto>): DloginReqDto {
        return new DloginReqDto(body.username, body.password);
    }
}
