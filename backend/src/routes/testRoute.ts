import express from 'express';

const router = express.Router();

const testController = require('../controllers/testController');

router.post('/tst', testController.testFunc);
