import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Doctor from '../models/Doctor';
import bcryptjs from 'bcryptjs';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { TOKEN_SECRECT } from '../config/config';
import { DoctorService } from '../services/doctor';
import { DoctorRepository } from '../repository/doctorrepo';
import { DloginReqDto } from '../DTO/doctorDto';
import { DloginResDto } from '../DTO/doctorDto';

const doctorService: DoctorService = new DoctorService(new DoctorRepository());

const createDoctor = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }

        const _doctor = new Doctor({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash
        });
        let dloginReqDto: DloginReqDto = new DloginReqDto(_doctor.username, _doctor.password);

        const doctor = doctorService.createD(dloginReqDto);
        return doctor

            .then((user) => {
                return res.status(201).json({
                    user
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const login = (req: Request, res: Response) => {
    let { username, password } = req.body;

    let dloginReqDto: DloginReqDto = new DloginReqDto(username, password);

    const doctor = doctorService.findD(dloginReqDto);
 return doctor
        .then((user) => {
            if (user.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            bcryptjs.compare(password, user[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Password Mismatch'
                    });
                } else if (result) {
                    const token = jwt.sign({ _id: user[0]._id }, TOKEN_SECRECT || 'wateveris');
                    res.json( {"accessToken":token,"username":user[0].username});
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

export default { createDoctor, login };
