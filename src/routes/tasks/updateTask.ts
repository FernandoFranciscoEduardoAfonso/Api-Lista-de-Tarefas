import { FastifyInstance} from "fastify"
import userController from '../../controllers/taskController'

export const updateTask = async (app: FastifyInstance)=>{
    app.patch("/task/:taskId", userController.update)
}
