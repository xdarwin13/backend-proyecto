import { Request, Response } from 'express';
import { EstudianteModel } from '../models/estudianteModel';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export class EstudianteController {
  public async register(req: Request, res: Response) {
    const { nombre, email, password, carrera } = req.body;

    try {
      const studentExists = await EstudianteModel.findOne({ where: { email } });
      if (studentExists) {
        return res.status(400).json({ msg: "Estudiante ya registrado" });
      }

      const newStudent = await EstudianteModel.create({ nombre, email, password, carrera });
      return res.status(201).json({ student: newStudent });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const student = await EstudianteModel.findOne({ where: { email } });
      if (!student) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
      }

      const passwordMatch = await bcryptjs.compare(password, student.password);
      if (!passwordMatch) {
        return res.status(400).json({ msg: "Credenciales inválidas" });
      }

      const token1 = jwt.sign({ id: student.id }, process.env.STUDENT_JWT_SECRET || 'studentdefaultsecret', {
        expiresIn: '1h',
      });

      return res.status(200).json({ token1, student });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  public async getProfile(req: Request, res: Response) {
    try {
      const studentId = req.params.id;
      const student = await EstudianteModel.findByPk(studentId, {
        attributes: ['id', 'nombre', 'email', 'carrera'],
      });

      if (!student) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
      }

      return res.status(200).json({ student });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
