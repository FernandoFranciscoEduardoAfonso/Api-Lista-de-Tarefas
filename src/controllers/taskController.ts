import { FastifyRequest, FastifyReply } from "fastify";
import TaskProps from "../interfaces/TaskProps";
import {Task} from '../models/taskModel'

interface Result{
    success?: boolean 
    message:string
    data?: any
}


export default {

    create : async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        const _ = new Task()
        const result : Result = await _.createTask(request, reply)       

        if (result) {
            //as mensagens colocar em toasts

            reply.send(result).status(201)
            console.log(result.message)
        }
    },


    getAll : async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        const _ = new Task()
        const result : Result = await _.getAllTasks(request, reply)   

        if (result) {
            reply.send(result).status(200)
            console.log(result.data)
        }
    },


    getSingle : async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        const _ = new Task()
        const result : Result = await _.getSingleTask(request, reply)   
        

        if (result) {
            reply.send(result).status(200)
            console.log(result.data)
        }
    },


    delete : async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        const _ = new Task()
        const result : Result = await _.deleteTask(request, reply)   
        

        if (result) {
            reply.send(result).status(200)
            console.log(result.data)
        }
    },

    update : async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        const _ = new Task()
        const result : Result = await _.updateTask(request, reply)   
        

        if (result) {
            reply.send(result).status(200)
            console.log(result.data)
        }
    },

}
