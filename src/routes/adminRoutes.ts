import { Request, Response, Application } from "express";
import { AdminController } from "../controllers/adminController";
import validateToken from "./veriToken";

export class AdminRoutes {
    public adminController: AdminController = new AdminController();

    public routes(app: Application): void {
        // Registrar admin
        app.route("/administradores/register").post(this.adminController.register);

        // Login admin
        app.route("/administradores/login").post(this.adminController.login);

        // Obtener perfil admin
        app.route("/administradores/:id").get(validateToken, this.adminController.getProfile);
    }
}
