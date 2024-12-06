import { FastifyReply, FastifyRequest } from "fastify"
import TaskProps from "../interfaces/TaskProps"
import { datetimeRegex, string, z } from "zod"
import { prisma } from "../database/prisma"

interface Result{
    success?: boolean 
    message:string
    data?: any
}

export class Task{
    constructor(){
        
    }

    createTask = async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{

        try {
            //validar com zod
            const BodyScheme = z.object({
                title: z.string({message:"O title tem de ser uma string"}).min(5, "O title tem de ter no minimo 5 caracteres"),
                description: z.string({message:"A descricao tem de ser uma string"}).min(10, "A descricao tem de ter no minimo 10 caracteres"),
                createdAt: z.optional( z.date()),
                completedAt:z.optional( z.string({message:"CompletedAt deve ser uma data"}).min(10, "Data completedAt inválida")),
                updatedAt: z.optional(z.string({message:"UpdatedAt deve ser uma data"}).min(10, "Data updatedAt inválida"))
            })

            // validar a tarefa
            const taskData = BodyScheme.parse(request.body)


            // criar a tarefa
            const newTask = await prisma.task.create({
                data:{
                   title: taskData.title,
                   description: taskData.description
                }
            })

            this.closeConnection()

            const response = {success: true, message: "Tarefa cadastrada com sucesso", data: newTask}

            return response

        } catch (error:any) {    
            
            if (error.name==='ZodError') {
                const response : Result=  {message: error.issues[0].message}
                return response

            }else{
                const response : Result=  {message: error}
                return response
            }
           
        }

    }

    getAllTasks = async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        try {
            const tasks = await prisma.task.findMany()

            this.closeConnection()
            const response : Result = {success: true, message: "Lista de Tarefas", data: tasks}
            return response
            
        } catch (error:any) {
            const response : Result=  {message: error.message}
            return response
        }
       
    }

    getSingleTask = async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        try {
            const ParamsScheme = z.object({
                taskId: z.string().uuid({message:"Id inválido"})
            })
            const {taskId} = ParamsScheme.parse(request.params)

            const task = await prisma.task.findUnique({
                where: {id : taskId}
            })
    
            if (!task) {
                this.closeConnection()
                const response : Result=  {success:false, message: "Esta Tarefa não existe"}
                return response
            }else{
                this.closeConnection()
                const response : Result=  {success: true, message: "Tarefa", data: task}
                return response
        
            }
    
    
           
        } catch (error:any) {
            if (error.name==='ZodError') {
                const response : Result=  {message: error.issues[0].message}
                return response

            }else{
                const response : Result=  {message: error}
                return response
            }

        }
       
    }



    deleteTask = async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        try {

            const ParamsScheme = z.object({
                taskId: z.string().uuid({message:"Id inválido"})
            })
            const {taskId} = ParamsScheme.parse(request.params)

            //verificar na DB, se a tarefa existe
            const exists = await this.existsTask(taskId)
            if (!exists) {
                this.closeConnection()
                const response : Result=  {success:false, message: "Esta Tarefa não existe"}
                return response
              
            }else{
                const user = await prisma.task.delete({
                    where: {id : taskId}
                })
        
                this.closeConnection()
                const response : Result=  {success: true, message: "Tarefa deletada", data: user}
                return response
            }
    
          

        } catch (error:any) {
            if (error.name==='ZodError') {
                const response : Result=  {message: error.issues[0].message}
                return response

            }else{
                const response : Result=  {message: error}
                return response
            }
        }
    }

    updateTask = async (request: FastifyRequest<{Body: TaskProps, Params:number}>, reply: FastifyReply)=>{
        try {

            const BodyScheme = z.object({
                title:  z.optional(z.string({message:"O title tem de ser uma string"}).min(5, "O title tem de ter no minimo 5 caracteres")),
                description:  z.optional(z.string({message:"A descricao tem de ser uma string"}).min(10, "A descricao tem de ter no minimo 10 caracteres")),
                createdAt: z.optional(z.date()),
                completedAt:z.optional( z.string({message:"CompletedAt deve ser uma data"}).min(10, "Data completedAt inválida")),
                updatedAt: z.optional(z.string({message:"UpdatedAt deve ser uma data"}).min(10, "Data updatedAt inválida"))
            })

            const ParamsScheme = z.object({
                taskId: z.string().uuid({message:"Id inválido"})
            })

         
            const taskData = BodyScheme.parse(request.body)
            const {taskId} = ParamsScheme.parse(request.params)

            


            const task = await prisma.task.findUnique({
                where: {id : taskId}
            })
            const oldTaskData = task
           
            //se os dados da tarefa antiga forem falsos(será falso quando retornar null)
            if (!oldTaskData) {
                this.closeConnection()
                const response : Result=  {success:false, message: "Esta Tarefa não existe"}
                return response
              
            
            }else{
                const user = await prisma.task.update({
                    where:{id:taskId},
                    data:{
                        title: taskData.title || oldTaskData?.title,
                        description: taskData.description || oldTaskData?.description,
                        updatedAt: taskData.updatedAt || oldTaskData?.updatedAt,
                        completedAt: taskData.completedAt || oldTaskData?.completedAt
                    }
                })
        
                this.closeConnection()

                //se a tarefa não foi atualizada e já foi completada
                if(!taskData.updatedAt && oldTaskData?.completedAt) {
                    const response : Result=  {success: true, message: "Esta Tarefa já foi concluida", data: user}
                    return response
                }else{


                    if (taskData.completedAt) {
                        const response : Result=  {success: true, message: "Tarefa concluida", data: user}
                        return response
                    }else{
                        const response : Result=  {success: true, message: "Tarefa atualizada", data: user}
                        return response
                    }
                }

               
                
            }
          

        } catch (error:any) {
            if (error.name==='ZodError') {
                const response : Result=  {message: error.issues[0].message}
                return response

            }else{
                const response : Result=  {message: error}
                return response
            }
        }
    }


    existsTask = async (taskId:string)=>{

        const exists = await prisma.task.findUnique({
            where: {id:taskId}
        })

        return exists ? true: false 
    }

    closeConnection = async () => await prisma.$disconnect()



}