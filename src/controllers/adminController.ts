import { Request, Response } from 'express';
import { AdminModel } from '../models/adminModel';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export class AdminController {
  public async register(req: Request, res: Response) {
    const { nombre, email, password } = req.body;

    try {
      const adminExists = await AdminModel.findOne({ where: { email } });
      if (adminExists) {
        return res.status(400).json({ msg: "Administrador ya registrado" });
      }

      const newAdmin = await AdminModel.create({ nombre, email, password });
      return res.status(201).json({ admin: newAdmin });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const admin = await AdminModel.findOne({ where: { email } });
      if (!admin) {
        return res.status(404).json({ msg: "Administrador no encontrado" });
      }

      const passwordMatch = await bcryptjs.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(400).json({ msg: "Credenciales inválidas" });
      }

      const token = jwt.sign({ id: admin.id }, process.env.ADMIN_JWT_SECRET || 'admindefaultsecret', {
        expiresIn: '1h',
      });

      return res.status(200).json({ token, admin });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async getProfile(req: Request, res: Response) {
    try {
      const adminId = req.params.id;
      const admin = await AdminModel.findByPk(adminId, {
        attributes: ['id', 'nombre', 'email'],
      });

      if (!admin) {
        return res.status(404).json({ msg: "Administrador no encontrado" });
      }

      return res.status(200).json({ admin });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
