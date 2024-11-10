// app.js
import express from "express";
import connectMongoAtlas from "./src/config/dbConnect.js";
import userRoutes from "./src/routes/userRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import cors from 'cors';
import './src/aop/aop.js'; // Importa para habilitar os aspectos
import  {errorHandler}  from './src/middlewares/erroHandler.ts'; // Importe o middleware

class App {
    port: string | number;
    app: express.Application;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
        this.errorHandler(); // Registre o middleware de tratamento de erros aqui
        this.startServer();
        connectMongoAtlas();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
    
    }

    routes() {
        this.app.use('/user', userRoutes);
        this.app.use('/task', taskRoutes);
        this.app.get('/', (req, res) => {
            res.send('Api ok!');
        });
    }

    errorHandler() {
        // Adicione o middleware de tratamento de erros após as rotas
        this.app.use(errorHandler);
    }


    startServer() {
        this.app.listen(this.port, () => {
            console.log('Servidor On ' + this.port);
        });
    }
}

export default new App().app;
