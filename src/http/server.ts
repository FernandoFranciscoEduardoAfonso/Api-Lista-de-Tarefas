import fastify from "fastify";
import { allRoutes } from "../routes/@allRoutes";

import {config as dotenvConfig} from 'dotenv'

dotenvConfig()
import * as dotenv from 'dotenv'
dotenv.config()

const app = fastify()

//rota principal
app.get("/", (request, reply)=>{
    return reply.send("Hello word").code(200)
})

//busca todas as outras rotas
app.register(allRoutes)


const startServer = async ()=>{
    //PORT é a porta definida pelo render, se tiver uma, vamos usar e se não tiver usamos a porta 5555
    app.listen({port: process.env.PORT? Number(process.env.PORT) : 3333, host:"0.0.0.0"}, (error, address)=>{
        if (error) 
            console.log(`Exists an error: ${error}`)
        
        console.log(`Server is running on ${address}`)
    })
}

startServer()


export default app