import { RcreateReqDto } from '../DTO/recordsDto';
import { RecordsRepository } from '../repository/reacordsrepo';

export class RecordsService {
    constructor(public recordRepo: RecordsRepository) {}

    async createR(recordData: RcreateReqDto) {
        const record = await this.recordRepo.CreateRecord(recordData);

        return record;
    }
}
