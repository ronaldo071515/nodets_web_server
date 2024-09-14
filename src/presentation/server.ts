import path from 'path';
import express, { Router } from 'express';
import compression from 'compression';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor( options: Options ) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start() {


        //* Middlewares Lectura y parseo del body
        this.app.use( express.json() );/* raw */
        this.app.use( express.urlencoded({ extended: true }) );/* x-www-form-urlencoded */
        this.app.use(compression());

        //* Public Folders
        this.app.use(express.static( this.public_path ));
        
        //* Routes
        this.app.use( this.routes );

        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join( __dirname + `../../../${ this.public_path }/index.html` );
            res.sendFile(indexPath);
        })
        
        this.serverListener =  this.app.listen(this.port, () => {
            console.log(`Server runnig on port ${ this.port }`);
        });
    }

    public close() {
        this.serverListener?.close();
    }
    
}