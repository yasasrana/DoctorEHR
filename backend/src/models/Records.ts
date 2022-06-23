//import { number, string } from "joi";
import { date } from 'joi';
import mongoose, { Date, Document, Schema, Types } from 'mongoose';

export interface Imreacord {
    complaint: string;
    bloodpressure: string;
    pulse: string;
    weight: string;
    illness: Types.Array<string>;
    Treatment: Types.Array<string>;
    createdAt: Date;
    updatedAt: Date;
}

export interface ImreacordModel extends Imreacord, Document {}

const RecordSchema: Schema = new Schema(
    {
        complaint: { type: String,  },
        bloodpressure: { type: String,  },
        pulse: { type: String },
        weight: { type: String  },
        illness: [String],
        Treatment: [String],
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now()
        },
        updatedAt: {
            type: Date,
            default: () => Date.now()
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ImreacordModel>('Record', RecordSchema);
