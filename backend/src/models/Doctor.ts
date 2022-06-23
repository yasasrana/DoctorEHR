import { date, string } from 'joi';
import mongoose, { Date, Document, Schema, Types } from 'mongoose';
import Record from './Records';

export interface IDoctor {
    username: string;
    password: string;
}

export interface IDoctorModel extends IDoctor, Document {}

const DoctorSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IDoctorModel>('Doctor', DoctorSchema);
