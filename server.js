import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import __dirname from './utils/pathUtils.js';
import router from './routes/routes.js';
import connectDB from './config/db.js';

import { 
    staticMiddleware, 
    urlencodedMiddleware, 
    morganMiddleware, 
    securityMiddleware, 
    jsonMiddleware, 
    compressionMiddleware, 
    rateLimitMiddleware } 
from './middlewares/middlewares.js';











dotenv.config();

const app = express();
const port = process.env.PORT;

// Conecta com o Banco

connectDB();
//
// Usando os Middlewares

app.use(staticMiddleware);
app.use(jsonMiddleware);
app.use(securityMiddleware);
app.use(compressionMiddleware);
//app.use(rateLimitMiddleware);
app.use(urlencodedMiddleware);
//app.use(morganMiddleware);

// Usando os Endpoints

// Configurar o EJS como motor de template
app.set('view engine', 'ejs');

// Definir o diretório onde as views (templates) estão localizadas
app.set('views', path.join(__dirname, 'views')); // Ajuste o caminho conforme necessário

// Outras configurações e rotas do seu servidor

app.use(router);

app.listen(port, () => {
    console.log(`Servidor ativo rodando na porta ${port}`)
});
