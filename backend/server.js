import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import __dirname from './utils/pathUtils.js';
import router from './routes/routes.js';
import connectDB from './config/db.js';
import cors from 'cors';   

import { 
    staticMiddleware, 
    urlencodedMiddleware,  
    jsonMiddleware, 
    compressionMiddleware
 } 
from './middlewares/middlewares.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors());

// Usando os Middlewares

app.use(staticMiddleware);
app.use(jsonMiddleware);
app.use(compressionMiddleware);
//app.use(rateLimitMiddleware);
app.use(urlencodedMiddleware);
//app.use(morganMiddleware);

// por algo assim:
app.use(
  '/backend/uploads',
  express.static(path.join(__dirname, 'backend/uploads'), {
    setHeaders: (res, filePath) => {
      // permite qualquer origem — ajuste se quiser restringir
      res.setHeader('Access-Control-Allow-Origin', '*');
      // para range requests funcionar corretamente
      res.setHeader('Accept-Ranges', 'bytes');
    }
  })
);

app.use(router);

app.listen(port, () => {
    console.log(`Servidor ativo rodando na porta ${port}`)
});