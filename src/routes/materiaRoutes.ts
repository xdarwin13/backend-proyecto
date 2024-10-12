import { Request, Response, Application } from "express";
import { MateriaController } from "../controllers/materiaController";
import validateToken from "./veriToken";

export class MateriaRoutes {
    public materiaController: MateriaController = new MateriaController();

    public routes(app: Application): void {
        // Registrar nueva materia
        app.route("/materias").post( this.materiaController.crearMateria);

        // Listar todas las materias
        app.route("/materias").get( this.materiaController.listarMaterias);

        // Actualizar materia
        app.route("/materias/:id").patch( this.materiaController.actualizarMateria);

        // Eliminar materia
        app.route("/materias/:id").delete(this.materiaController.eliminarMateria);
    }
}
