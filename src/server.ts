import express from 'express';
import cors from 'cors';
import homeRoutes from './routes/HomeRouter';

class App {

    public app: express.Application;

    constructor(){
        this.app = express();
        this.routes();
    }

    private routes() {
        this.app.use('/api', homeRoutes);
    }
}

export default new App().app;
