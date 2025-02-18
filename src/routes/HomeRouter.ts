import { Router, Request, Response} from 'express';
import { HomeController } from '../controllers/HomeController';
import { authJwtValidate } from '../middlewares/Auth-middleware';

export class HomeRouter {
	public router: Router;
	private home_ci: HomeController;

	constructor(){
		this.home_ci = new HomeController();
	  	this.router = Router();
	  	this.routes()
	}

	private routes() {
		this.router.get('/', authJwtValidate, this.home_ci.getHome.bind(this.home_ci));
	 	this.router.post('/login', this.home_ci.getlogin.bind(this.home_ci))
	}
}

export default new HomeRouter().router
