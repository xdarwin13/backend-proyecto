import { Request, Response, Application } from "express";
import { ProfesorController } from "../controllers/profesorController";
import validateTokenAdmin from "../middleware/veriTokenAdmin";

export class ProfesorRoutes {
    public profesorController: ProfesorController = new ProfesorController();

    public routes(app: Application): void {
        // Registrar profesor
        app.route("/profesores/register").post(validateTokenAdmin,this.profesorController.register);

        // Login profesor
        app.route("/profesores/login").post(this.profesorController.login);

        // Obtener perfil profesor
        app.route("/profesores/:id").get(validateTokenAdmin,this.profesorController.getProfile);
    }
}
