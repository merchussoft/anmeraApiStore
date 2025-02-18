import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/HomeRouter';

class App {

    public app: express.Application;

    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use('/api', homeRoutes);
    }

    
}

export default new App().app;
