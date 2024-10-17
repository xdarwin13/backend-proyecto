import { Request, Response } from 'express';
import { AsistenciaModel } from '../models/asistenciaModel';
import { EstudianteModel } from '../models/estudianteModel';
import { MateriaModel } from '../models/materiaModel';
import moment from 'moment-timezone';

export class AsistenciaController {
  // Registrar asistencia como estudiante
  public async registrarAsistenciaEstudiante(req: Request, res: Response) {
    const { id_estudiante, id_materia, salon, fecha, hora_entrada, hora_salida } = req.body;

    try {
      const nuevaAsistencia = await AsistenciaModel.create({
        id_estudiante,
        id_materia,
        salon,
        fecha,
        hora_entrada,
        hora_salida,
      });

      res.status(201).json({ asistencia: nuevaAsistencia });
    } catch (error) {
      res.status(500).json({ error: "Error al registrar la asistencia" });
    }
  }

  // Registrar asistencia como profesor
  public async registrarAsistenciaProfesor(req: Request, res: Response) {
    const { id_profesor, id_materia, salon, hora_entrada, hora_salida } = req.body;

    try {
      const nuevaAsistencia = await AsistenciaModel.create({
        id_profesor,
        id_materia,
        salon,
        fecha: new Date(),
        hora_entrada,
        hora_salida,
      });

      res.status(201).json({ asistencia: nuevaAsistencia });
    } catch (error) {
      res.status(500).json({ error: "Error al registrar la asistencia" });
    }
  }

// Listar todas las asistencias con nombres de estudiantes y materias
public async listarAsistencias(req: Request, res: Response) {
  try {
      const asistencias = await AsistenciaModel.findAll({
          include: [
              {
                  model: EstudianteModel,
                  attributes: ['id', 'nombre'], // Incluye los atributos necesarios del estudiante
                  as: 'estudiante' // Asegúrate de usar el alias definido en la relación
              },
              {
                  model: MateriaModel,
                  attributes: ['id', 'nombre'], // Incluye los atributos necesarios de la materia
                  as: 'materia' // Asegúrate de usar el alias definido en la relación
              },
          ],
      });

      // Formatear la respuesta para incluir solo lo necesario
      const response = asistencias.map(asistencia => ({
          id_estudiante: asistencia.id_estudiante,
          nombre_estudiante: asistencia.estudiante?.nombre, // Acceder al nombre del estudiante
          id_materia: asistencia.id_materia,
          nombre_materia: asistencia.materia?.nombre, // Acceder al nombre de la materia
          salon: asistencia.salon,
          fecha: asistencia.fecha,
          hora_entrada: asistencia.hora_entrada,
          hora_salida: asistencia.hora_salida,
      }));

      res.status(200).json({ asistencias: response });
  } catch (error) {
      console.error(error); // Esto ayuda a depurar el error
      res.status(500).json({ error: "Error al obtener las asistencias" });
  }
}

  // Actualizar asistencia
  public async actualizarAsistencia(req: Request, res: Response) {
    const { id: pk } = req.params;

    const {
        id_estudiante,
        id_profesor,
        id_materia,
        salon,
        hora_entrada,
        hora_salida
    } = req.body;

    try {
        // Crear el objeto con los nuevos valores para la asistencia
        let body = {
            id_estudiante,
            id_profesor,
            id_materia,
            salon,
            hora_entrada,
            hora_salida
        };

        // Verificar si la asistencia existe
        const asistenciaExist = await AsistenciaModel.findByPk(pk);
        if (!asistenciaExist) return res.status(404).json({ msg: "La asistencia no existe" });

        // Actualizar la asistencia
        await AsistenciaModel.update(body, {
            where: { id: pk }
        });

        // Obtener la asistencia actualizada
        const asistenciaActualizada = await AsistenciaModel.findByPk(pk);
        if (asistenciaActualizada) return res.status(200).json({ asistencia: asistenciaActualizada });

    } catch (error) {
        // Manejar el error y enviar respuesta de error
        console.error(error); // Esto ayuda a depurar el error
        return res.status(500).json({ error: "Error al actualizar la asistencia" });
    }
}

}