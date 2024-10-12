import { Request, Response, Application } from "express";
import { AsistenciaController } from "../controllers/asistenciaController";
import validateToken from "./veriToken";

export class AsistenciaRoutes {
    public asistenciaController: AsistenciaController = new AsistenciaController();

    public routes(app: Application): void {
        // Registrar asistencia como estudiante
        app.route("/asistencias/estudiante").post(validateToken,this.asistenciaController.registrarAsistenciaEstudiante);

        // Registrar asistencia como profesor
        app.route("/asistencias/profesor").post( this.asistenciaController.registrarAsistenciaProfesor);

        // Listar todas las asistencias
        app.route("/asistencias").get( this.asistenciaController.listarAsistencias);

        // Actualizar asistencia
        app.route("/asistencias/:id").patch( this.asistenciaController.actualizarAsistencia);
    }
}
