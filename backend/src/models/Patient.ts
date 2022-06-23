import { date, string} from "joi";
import mongoose,{Date, Document,Schema,Types} from "mongoose";
import Record from "./Records";



export interface IPatient {
   
    firstname:string,
    lastname:string,
    telephone:string,
    dob:string,
    sex:string,
    records:Types.Array<string>

}

export interface IPatientModel extends IPatient,Document {}


const PatientSchema:Schema = new Schema (
    {   
        firstname:{ type:String,},
        lastname:{ type:String,},
        telephone:{ type:String,},
        dob:{ type:Date},
        sex:{type:String},
        records:[{ type:Schema.Types.ObjectId, ref:'Record'}],
    },
    {
          versionKey:false
    }
)

export default mongoose.model<IPatientModel>('Patient',PatientSchema);