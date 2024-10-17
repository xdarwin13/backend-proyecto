import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { EstudianteModel } from "./estudianteModel";
import { ProfesorModel } from "./profesorModel";
import { MateriaModel } from "./materiaModel"; // Importa el modelo de materia

export class AsistenciaModel extends Model {
    public id!: number;
    public id_estudiante?: number; // Relación opcional con estudiante
    public id_profesor?: number;   // Relación opcional con profesor
    public id_materia!: number;     // Relación con materia (clave foránea)
    public salon!: string;          // Campo para almacenar el número del salón
    public fecha!: Date;
    public hora_entrada!: Date;
    public hora_salida?: Date;

    // Propiedades para las relaciones
    public estudiante?: EstudianteModel; // Propiedad para la relación estudiante
    public profesor?: ProfesorModel;       // Propiedad para la relación profesor
    public materia?: MateriaModel;         // Propiedad para la relación materia

    public createdAt!: Date;
    public updatedAt!: Date;
}

export interface AsistenciaI {
    id_estudiante?: number; // Relación opcional con estudiante
    id_profesor?: number;   // Relación opcional con profesor
    id_materia: number;     // Relación con materia (clave foránea)
    salon: string;          // Campo para almacenar el número del salón
    fecha: Date;
    hora_entrada: Date;
    hora_salida?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

AsistenciaModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_estudiante: {
            type: DataTypes.INTEGER,
            allowNull: true, // Opcional
            references: {
                model: EstudianteModel, // Modelo de estudiante
                key: 'id',
            },
        },
        id_profesor: {
            type: DataTypes.INTEGER,
            allowNull: true, // Opcional
            references: {
                model: ProfesorModel, // Modelo de profesor
                key: 'id',
            },
        },
        id_materia: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: MateriaModel, // Modelo de materia
                key: 'id',
            },
        },
        salon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            defaultValue: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })),
        },
        hora_entrada: {
            type: DataTypes.TIME, // Solo la hora
            defaultValue: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })),
        },
        hora_salida: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })),
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })),
          },
    },
    {
        tableName: "asistencias",
        sequelize: database,
        timestamps: false,
        hooks: {
            beforeUpdate: (bus: AsistenciaModel) => {
              bus.updatedAt = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
            },
          },
    }
);

// Establecer relaciones
AsistenciaModel.belongsTo(EstudianteModel, {
    foreignKey: 'id_estudiante',
    targetKey: 'id', // Asumiendo que el campo clave primaria es 'id'
    as: 'estudiante', // Alias para acceder a la relación
});

AsistenciaModel.belongsTo(ProfesorModel, {
    foreignKey: 'id_profesor',
    targetKey: 'id', // Asumiendo que el campo clave primaria es 'id'
    as: 'profesor', // Alias para acceder a la relación
});

AsistenciaModel.belongsTo(MateriaModel, {
    foreignKey: 'id_materia',
    targetKey: 'id', // Asumiendo que el campo clave primaria es 'id'
    as: 'materia', // Alias para acceder a la relación
});
