"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const PatientRoutes_1 = __importDefault(require("./routes/PatientRoutes"));
const DoctorRoutes_1 = __importDefault(require("./routes/DoctorRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.default)();
// connect mongo
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
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
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    //routes
    router.use('/patient', PatientRoutes_1.default);
    router.use('/doctor', DoctorRoutes_1.default);
    //test
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    //error handling
    router.use((req, res, next) => {
        const error = new Error('not Found');
        console.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => console.info(`Server is running on port ${config_1.config.server.port}`));
};
