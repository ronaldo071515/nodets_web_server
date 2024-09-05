/* los datasources son las reglas para poder crear otros datasources */

import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {

    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;

    //TODO: paginación
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById( id: number ): Promise<TodoEntity>;
    abstract updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
    abstract deleteById( id: number ): Promise<TodoEntity>;
    
}