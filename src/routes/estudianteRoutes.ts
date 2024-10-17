import { Request, Response, Application, Router } from "express";
import { EstudianteController } from "../controllers/estudianteController";
import validateTokenAdmin from "../middleware/veriTokenAdmin";

export class EstudianteRoutes {
    public estudianteController: EstudianteController = new EstudianteController();

    public routes(app: Application): void {
        // Registrar estudiante
        app.route("/estudiantes/register").post(validateTokenAdmin,this.estudianteController.register);

        // Login estudiante
        app.route("/estudiantes/login").post(this.estudianteController.login);

        // Listar todos los estudiantes
        app.route("/estudiantes").get(validateTokenAdmin, this.estudianteController.mostrarTodosLosEstudiantes);


        // Obtener perfil estudiante
        app.route("/estudiantes/:id").get(validateTokenAdmin,this.estudianteController.getOneEstudiante);

        // Actualizar estudiante
        app.route("/estudiantes/:id").put(validateTokenAdmin,this.estudianteController.actualizarEstudiante);

        // Eliminar estudiante
        app.route("/estudiantes/:id").delete(validateTokenAdmin,this.estudianteController.eliminarEstudiante);
    }
}
