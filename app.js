// app.js
import express from "express";
import connectMongoAtlas from "./src/config/dbConnect.js";
import userRoutes from "./src/routes/userRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import cors from 'cors';

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
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

    startServer() {
        this.app.listen(this.port, () => {
            console.log('Servidor On ' + this.port);
        });
    }
}

export default new App().app;
