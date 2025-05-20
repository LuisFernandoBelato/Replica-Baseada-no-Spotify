import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import __dirname from './utils/pathUtils.js';
import router from './routes/routes.js';
import connectDB from './config/db.js';
import cors from 'cors';   

import Usuario from './models/Usuario/Usuario.js';

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

app.use(
  '/backend/uploads',
  express.static(path.join(__dirname, 'backend/uploads'), {
    setHeaders: (res, filePath) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  })
);

app.use(router);



app.listen(port, async () => {
  const usuarioExists = await Usuario.findByEmail("admin@admin.com");
  console.log("usuarioExists = ", usuarioExists)

  if (usuarioExists.length == 0)
  {
    const novoUsuario = new Usuario("Admin", "admin@admin.com", "123", "Rua", "Bairro", "ET", "00000-000"); 
    novoUsuario.save();
  }
  console.log(`Servidor ativo rodando na porta ${port}`)
});
