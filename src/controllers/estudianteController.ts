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

  // Método para obtener todos los estudiantes
  public async mostrarTodosLosEstudiantes(req: Request, res: Response) {
    try {
      const estudiantes = await EstudianteModel.findAll(); // Obtener todos los estudiantes


      return res.status(200).json({ estudiantes });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los estudiantes" });
    }
  }

  // Obtener un estudiante por ID
public async getOneEstudiante(req: Request, res: Response) {
  const { id: idParam } = req.params;

  try {
      const estudiante = await EstudianteModel.findByPk(idParam, {
          attributes: ['id', 'nombre', 'email', 'carrera'], // Selecciona los campos que quieres retornar
      });

      if (estudiante) {
          res.status(200).json(estudiante); // Retorna los datos del estudiante si lo encuentra
      } else {
          return res.status(404).json({ msg: "El estudiante no existe" });
      }
  } catch (error) {
      res.status(500).json({ msg: "Error interno" });
  }
}



  // Actualizar estudiante
public async actualizarEstudiante(req: Request, res: Response) {
  const { id: pk } = req.params;
  const { nombre, email, carrera, password } = req.body;

  try {
      // Verificar si el estudiante existe
      const estudianteExist = await EstudianteModel.findByPk(pk);
      if (!estudianteExist) return res.status(404).json({ msg: "Estudiante no encontrado" });

      // Preparar el objeto con los datos actualizados
      let updateData = { nombre, email, carrera, password };

      // Actualizar el estudiante
      await EstudianteModel.update(updateData, {
          where: { id: pk },
          individualHooks: true // Este hook maneja el cifrado de la contraseña
      });

      // Obtener el estudiante actualizado
      const estudianteActualizado = await EstudianteModel.findByPk(pk, {
          attributes: ['id', 'nombre', 'email', 'carrera'] // No devolvemos la contraseña
      });

      if (estudianteActualizado) {
          return res.status(200).json({ student: estudianteActualizado });
      }
  } catch (error) {
      console.error(error); // Para depuración
      return res.status(500).json({ error: "Error al actualizar el estudiante" });
  }
}
 // Eliminar estudiante
 public async eliminarEstudiante(req: Request, res: Response) {
  const { id: pk } = req.params;
  try {
      // Verificar si el estudiante existe
      const estudianteExist = await EstudianteModel.findByPk(pk);
      if (!estudianteExist) return res.status(404).json({ msg: "El estudiante no existe" });

      // Eliminar el estudiante
      await EstudianteModel.destroy({ where: { id: pk } });
      res.status(200).json({ msg: "Estudiante eliminado" });
  } catch (error) {
      res.status(500).json({ error: "Error al eliminar el estudiante" });
  }
}

}
