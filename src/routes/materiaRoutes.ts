import { Request, Response, Application } from "express";
import { MateriaController } from "../controllers/materiaController";
import validateTokenAdmin from "../middleware/veriTokenAdmin";
import validateTokenEstudiantes from "../middleware/veriTokenEstudiante";

export class MateriaRoutes {
    public materiaController: MateriaController = new MateriaController();

    public routes(app: Application): void {
        // Registrar nueva materia
        app.route("/materias").post(validateTokenAdmin,this.materiaController.crearMateria);

        // Listar todas las materias
        app.route("/materias").get(validateTokenAdmin,this.materiaController.mostrarTodasLasMaterias);

        // Listar todas las materias Estudiantes
        app.route("/materias/carreras").post(validateTokenEstudiantes,this.materiaController.listarMaterias);

        // Actualizar materia
        app.route("/materias/:id").patch(validateTokenAdmin,this.materiaController.actualizarMateria);

        // Eliminar materia
        app.route("/materias/:id").delete(validateTokenAdmin,this.materiaController.eliminarMateria);
    }
}
