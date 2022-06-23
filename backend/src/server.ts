import express from 'express';
import http from 'http';
import mongoose, { connect } from 'mongoose';
import { config } from './config/config';
import patientroutes from './routes/PatientRoutes';
import doctorroutes from './routes/DoctorRoutes';
import dotenv from 'dotenv';
import Cors from 'cors';
dotenv.config();
const router = express();

// connect mongo

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('connected');
        StartServer();
    })
    .catch((error) => {
        console.log(error);
    });

//start server if monogo connects

const StartServer = () => {
    router.use((req, res, next) => {
        //log req
        console.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //Log res
            console.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    //middlewares
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(Cors());

    //routes
    router.use('/patient', patientroutes);
    router.use('/doctor', doctorroutes);

    //test
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    //error handling
    router.use((req, res, next) => {
        const error = new Error('not Found');
        console.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => console.info(`Server is running on port ${config.server.port}`));
};
