import { Request, Response } from 'express';
import { AsistenciaModel } from '../models/asistenciaModel';

export class AsistenciaController {
  // Registrar asistencia como estudiante
  public async registrarAsistenciaEstudiante(req: Request, res: Response) {
    const { id_estudiante, materia, salon, hora_entrada, hora_salida } = req.body;

    try {
      const nuevaAsistencia = await AsistenciaModel.create({
        id_estudiante,
        materia,
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

  // Registrar asistencia como profesor
  public async registrarAsistenciaProfesor(req: Request, res: Response) {
    const { id_profesor, materia, salon, hora_entrada, hora_salida } = req.body;

    try {
      const nuevaAsistencia = await AsistenciaModel.create({
        id_profesor,
        materia,
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

  // Listar todas las asistencias
  public async listarAsistencias(req: Request, res: Response) {
    try {
      const asistencias = await AsistenciaModel.findAll();
      res.status(200).json({ asistencias });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las asistencias" });
    }
  }

  // Actualizar asistencia
  public async actualizarAsistencia(req: Request, res: Response) {
    const { id: pk } = req.params;

    const {
        id_estudiante,
        id_profesor,
        materia,
        salon,
        hora_entrada,
        hora_salida
    } = req.body;

    try {
        // Crear el objeto con los nuevos valores para la asistencia
        let body = {
            id_estudiante,
            id_profesor,
            materia,
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