import { Router, Request, Response } from 'express';

export class HomeRouter {
	public router: Router;

	constructor(){
	  this.router = Router();
	  this.routes()
	}

	private routes() {
	 this.router.get('/', (req: Request, res: Response) => {
	  res.json({message: "hola mundo desde aqui"})
	 })
	}
}

export default new HomeRouter().router
