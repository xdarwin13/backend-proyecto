import { Request, Response } from 'express';
import { ProfesorModel } from '../models/profesorModel';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export class ProfesorController {
  public async register(req: Request, res: Response) {
    const { nombre, email, password } = req.body;

    try {
      const professorExists = await ProfesorModel.findOne({ where: { email } });
      if (professorExists) {
        return res.status(400).json({ msg: "Profesor ya registrado" });
      }

      const newProfessor = await ProfesorModel.create({ nombre, email, password });
      return res.status(201).json({ professor: newProfessor });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const professor = await ProfesorModel.findOne({ where: { email } });
      if (!professor) {
        return res.status(404).json({ msg: "Profesor no encontrado" });
      }

      const passwordMatch = await bcryptjs.compare(password, professor.password);
      if (!passwordMatch) {
        return res.status(400).json({ msg: "Credenciales inválidas" });
      }

      const token = jwt.sign({ id: professor.id }, process.env.PROFESSOR_JWT_SECRET || 'professordefaultsecret', {
        expiresIn: '1h',
      });

      return res.status(200).json({ token, professor });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async getProfile(req: Request, res: Response) {
    try {
      const professorId = req.params.id;
      const professor = await ProfesorModel.findByPk(professorId, {
        attributes: ['id', 'nombre', 'email'],
      });

      if (!professor) {
        return res.status(404).json({ msg: "Profesor no encontrado" });
      }

      return res.status(200).json({ professor });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
