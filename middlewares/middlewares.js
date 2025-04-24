import express from 'express';
import __dirname from '../utils/pathUtils.js';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// middlewares

const staticMiddleware = express.static(path.join(__dirname, 'assets'));

const urlencodedMiddleware = express.urlencoded({extended: true});
const jsonMiddleware = express.json();

const securityMiddleware = helmet();
const compressionMiddleware = compression();

const rateLimitMiddleware = rateLimit({
    windowMs: 10*60*1000, // 10 Minutos
    max: 100
})

const logFile = fs.createWriteStream(path.join(__dirname, "access.log"), {flags: "a"});
const morganMiddleware = morgan("combined", {stream: logFile});

export {
    staticMiddleware,
    urlencodedMiddleware,
    jsonMiddleware,
    securityMiddleware,
    compressionMiddleware,
    rateLimitMiddleware,
    morganMiddleware
}