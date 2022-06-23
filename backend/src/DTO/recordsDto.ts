import { Imreacord } from '../models/Records';
export class RcreateReqDto {
    constructor(
        // public readonly _id: Array<string>|undefined,
        public readonly Treatment: Array<string> | undefined,
        public readonly complaint: string | undefined,
        public readonly illness: Array<string> | undefined,
        public readonly pulse: string | undefined,
        public readonly bloodpressure: string | undefined,
        public readonly weight: string | undefined
    ) {}

    static from(body: Partial<RcreateReqDto>): RcreateReqDto {
        return new RcreateReqDto(
            //  body._id,
            body.Treatment,
            body.complaint,
            body.illness,
            body.pulse,
            body.bloodpressure,
            body.weight
        );
    }

    static fromMany(records: Imreacord[]) {
        return records.map((record) => RcreateReqDto.from(record));
    }
}
