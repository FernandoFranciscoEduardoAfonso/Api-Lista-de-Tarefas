import { FastifyInstance} from "fastify"
import userController from '../../controllers/taskController'

export const deleteTask = async (app: FastifyInstance)=>{
    app.delete("/task/:taskId", userController.delete)
}
