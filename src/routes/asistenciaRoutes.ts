import { Request, Response, Application } from "express";
import { AsistenciaController } from "../controllers/asistenciaController";
import validateTokenEstudiantes from "./veriTokenEstudiante";
import validateTokenProfesores from "./veriTokenProfesor";
import validateTokenAdmin from "./veriTokenAdmin";

export class AsistenciaRoutes {
    public asistenciaController: AsistenciaController = new AsistenciaController();

    public routes(app: Application): void {
        // Registrar asistencia como estudiante
        app.route("/asistencias/estudiante").post(validateTokenEstudiantes,this.asistenciaController.registrarAsistenciaEstudiante);

        // Registrar asistencia como profesor
        app.route("/asistencias/profesor").post(validateTokenProfesores,this.asistenciaController.registrarAsistenciaProfesor);

        // Listar todas las asistencias
        app.route("/asistencias").get(validateTokenAdmin,this.asistenciaController.listarAsistencias);

        // Actualizar asistencia
        app.route("/asistencias/:id").patch( this.asistenciaController.actualizarAsistencia);
    }
}
