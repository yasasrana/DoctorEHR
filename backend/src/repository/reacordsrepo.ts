import { RcreateReqDto } from '../DTO/recordsDto';
import Records from '../models/Records';

export class RecordsRepository {
    public readonly db=Records

    async CreateRecord(recordData:RcreateReqDto){
        return this.db.create(recordData)
    }

    

}