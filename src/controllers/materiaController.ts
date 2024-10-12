import { Request, Response } from 'express';
import { MateriaModel } from '../models/materiaModel';

export class MateriaController {
    // Crear nueva materia
    public async crearMateria(req: Request, res: Response) {
        const { nombre, carrera } = req.body;

        try {
            const nuevaMateria = await MateriaModel.create({
                nombre,
                carrera,
            });

            res.status(201).json({ materia: nuevaMateria });
        } catch (error) {
            res.status(500).json({ error: "Error al crear la materia" });
        }
    }

 // Listar materias por carrera
 public async listarMaterias(req: Request, res: Response) {
    const { carrera } = req.body; // Ahora espera que 'carrera' se pase en el cuerpo de la solicitud

    if (!carrera) {
        return res.status(400).json({ msg: "La carrera es obligatoria" });
    }

    try {
        const materias = await MateriaModel.findAll({
            where: { carrera } // Filtra las materias por la carrera especificada
        });

        if (materias.length === 0) {
            return res.status(404).json({ msg: "No se encontraron materias para esta carrera" });
        }

        res.status(200).json({ materias });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las materias por carrera" });
    }
}


    // Actualizar materia
    public async actualizarMateria(req: Request, res: Response) {
        const { id: pk } = req.params;
        const { nombre, carrera } = req.body;

        try {
            const materiaExist = await MateriaModel.findByPk(pk);
            if (!materiaExist) return res.status(404).json({ msg: "La materia no existe" });

            await MateriaModel.update({ nombre, carrera }, {
                where: { id: pk }
            });

            const materiaActualizada = await MateriaModel.findByPk(pk);
            if (materiaActualizada) return res.status(200).json({ materia: materiaActualizada });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la materia" });
        }
    }

    // Eliminar materia
    public async eliminarMateria(req: Request, res: Response) {
        const { id: pk } = req.params;

        try {
            const materiaExist = await MateriaModel.findByPk(pk);
            if (!materiaExist) return res.status(404).json({ msg: "La materia no existe" });

            await MateriaModel.destroy({ where: { id: pk } });
            res.status(200).json({ msg: "Materia eliminada" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la materia" });
        }
    }
}
