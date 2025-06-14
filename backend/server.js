import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import __dirname from './utils/pathUtils.js';
import router from './routes/routes.js';
import connectDB from './config/db.js';
import cors from 'cors';   
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware.js';

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
const port = process.env.BACKEND_PORT;

connectDB();

// Usando os Middlewares
app.use(staticMiddleware);
app.use(jsonMiddleware);
app.use(compressionMiddleware);
//app.use(rateLimitMiddleware);
app.use(urlencodedMiddleware);
//app.use(morganMiddleware);
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.ENVIROMENT}:${process.env.FRONTEND_PORT}`, // URL exata do frontend
    credentials: true, // Permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(
  '/backend/uploads',
  express.static(path.join(__dirname, 'backend/uploads'), {
    setHeaders: (res, filePath) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  })
);

// Rotas públicas
app.post("/login", router);
app.post("/create-user", router);

// Middleware de autenticação para rotas protegidas
app.use(authMiddleware);

// Rotas protegidas
app.use(router);

app.listen(port, async () => {
  const usuarioExists = await Usuario.findByEmail("admin@admin.com");
  console.log("usuarioExists = ", usuarioExists)

  if (!usuarioExists)
  {
    const senhaCriptografada = await bcrypt.hash("123", 10);
    const novoUsuario = new Usuario("Admin", "admin@admin.com", senhaCriptografada, "Rua", "Bairro", "ET", "00000-000"); 
    novoUsuario.save();
  }
  console.log(`Servidor ativo rodando na porta ${port}`)
});