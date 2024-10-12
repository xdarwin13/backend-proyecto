import { Request, Response, Application, Router } from "express";
import { EstudianteController } from "../controllers/estudianteController";
import validateToken from "./veriToken";

export class EstudianteRoutes {
    public estudianteController: EstudianteController = new EstudianteController();

    public routes(app: Application): void {
        // Registrar estudiante
        app.route("/estudiantes/register").post(this.estudianteController.register);

        // Login estudiante
        app.route("/estudiantes/login").post(this.estudianteController.login);

        // Obtener perfil estudiante
        app.route("/estudiantes/:id").get(this.estudianteController.getProfile);
    }
}
