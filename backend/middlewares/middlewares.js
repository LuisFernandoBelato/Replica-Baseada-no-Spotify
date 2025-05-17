import express from 'express';
import __dirname from '../utils/pathUtils.js';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';

// middlewares

const staticMiddleware = express.static(path.join(__dirname, 'assets'));
const urlencodedMiddleware = express.urlencoded({extended: true});
const jsonMiddleware = express.json();
//const securityMiddleware = helmet();
const compressionMiddleware = compression();

//const logFile = fs.createWriteStream(path.join(__dirname, "access.log"), {flags: "a"});
//const morganMiddleware = morgan("combined", {stream: logFile});

export {
    staticMiddleware,
    urlencodedMiddleware,
    jsonMiddleware,
    compressionMiddleware
}