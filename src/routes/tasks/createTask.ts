import { FastifyInstance} from "fastify"
import userController from '../../controllers/taskController'

export const createTask = async (app: FastifyInstance)=>{
    app.post("/task", userController.create)
}
