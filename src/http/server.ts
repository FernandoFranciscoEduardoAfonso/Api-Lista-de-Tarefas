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
    const PORT = Number(process.env.SERVER_PORT)
    app.listen({port: PORT, host:"127.0.0.1"}, (error, address)=>{
        if (error) 
            console.log(`Exists an error: ${error}`)
        
        console.log(`Server is running on ${address}`)
    })
}

startServer()


export default app