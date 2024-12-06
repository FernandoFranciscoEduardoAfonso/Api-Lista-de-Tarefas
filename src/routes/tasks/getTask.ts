import { FastifyInstance} from "fastify"
import userController from '../../controllers/taskController'

export const getTask = async (app: FastifyInstance)=>{
    app.get("/task", userController.getAll)

    app.get("/task/:taskId", userController.getSingle)
}


