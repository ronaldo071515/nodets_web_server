import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";

export class TodosController {

    //* DI
    constructor(){}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });
        
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if( !todo ) return res.status(404).json({ error: `TODO with ID ${ id } not fount`});

        return res.json({
            todo
        });
        
    }

    public createTodo = async (req: Request, res: Response) => {
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({ error });
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if( !todo ) return res.status(404).json({ error: `TODO with ID ${ id } not fount`});
        
        const { text, completedAt } = req.body;
        
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { text, completedAt: (completedAt) ? new Date(completedAt) : null }
        })

        res.json( updatedTodo );

    }

    public deleteTodo = async (req: Request, res: Response) => {
        
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if( !todo ) return res.status(404).json({ error: `TODO with ID ${ id } not fount`});

        const deleted = await prisma.todo.delete({
            where: {
                id
            }
        });

        (deleted)
            ? res.json( deleted )
            : res.status(400).json({ error: `Todo with ID ${ id } not found` });

    }

}