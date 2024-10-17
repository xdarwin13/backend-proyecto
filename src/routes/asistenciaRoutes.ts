import { Request, Response, Application } from "express";
import { AsistenciaController } from "../controllers/asistenciaController";
import validateTokenEstudiantes from "../middleware/veriTokenEstudiante";
import validateTokenProfesores from "../middleware/veriTokenProfesor";
import validateTokenAdmin from "../middleware/veriTokenAdmin";

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
        app.route("/asistencias/:id").patch(validateTokenAdmin,this.asistenciaController.actualizarAsistencia);

        // Eliminar asistencia
        app.route("/asistencias/:id").delete(validateTokenAdmin,this.asistenciaController.eliminarAsistencia);
    
    
    }
}
