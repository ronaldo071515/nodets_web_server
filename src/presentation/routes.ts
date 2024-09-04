import { Router } from "express";
import { TodosController } from './todos/controller';
import { TodoRoutes } from "./todos/todo.routes";



export class AppRoutes {

    static get routes(): Router {
        
        const router = Router();
        const todoController = new TodosController(); 

        router.use('/api/todos', TodoRoutes.routes);//* solo se envia la referencia de la fn

        return router;

    }
    
}