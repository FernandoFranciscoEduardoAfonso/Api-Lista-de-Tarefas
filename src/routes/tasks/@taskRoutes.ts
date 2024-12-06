import app from "../../http/server";
import { createTask } from "./createTask";
import { deleteTask } from "./deleteTask";
import { getTask } from "./getTask";
import { updateTask } from "./updateTask";

export const taskRoutes = ()=>{
    app.register(createTask)
    app.register(getTask)
    app.register(deleteTask)
    app.register(updateTask)
}
