import { Request, Response, Application } from "express";
import { ProfesorController } from "../controllers/profesorController";
import validateToken from "./veriToken";

export class ProfesorRoutes {
    public profesorController: ProfesorController = new ProfesorController();

    public routes(app: Application): void {
        // Registrar profesor
        app.route("/profesores/register").post(this.profesorController.register);

        // Login profesor
        app.route("/profesores/login").post(this.profesorController.login);

        // Obtener perfil profesor
        app.route("/profesores/:id").get(validateToken, this.profesorController.getProfile);
    }
}
