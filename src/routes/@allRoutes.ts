import app from "../http/server";
import { taskRoutes } from "./tasks/@taskRoutes";

export const allRoutes = ()=>{
    app.register(taskRoutes)
}