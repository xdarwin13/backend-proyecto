import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import moment from 'moment-timezone';
import { EstudianteModel } from "./estudianteModel";
import { ProfesorModel } from "./profesorModel";

export class AsistenciaModel extends Model {
  public id!: number;
  public id_estudiante?: number; // Relación opcional con estudiante
  public id_profesor?: number;   // Relación opcional con profesor
  public materia!: string;        // Campo para almacenar el nombre de la materia
  public salon!: string;          // Campo para almacenar el número del salón
  public fecha!: Date;
  public hora_entrada!: Date;
  public hora_salida?: Date;
}

export interface AsistenciaI {
  id_estudiante?: number; // Relación opcional con estudiante
  id_profesor?: number;   // Relación opcional con profesor
  materia: string;        // Campo para almacenar el nombre de la materia
  salon: string;          // Campo para almacenar el número del salón
  fecha: Date;
  hora_entrada: Date;
  hora_salida?: Date;
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
        model: EstudianteModel, // Modelo de usuario
        key: 'id',        // La clave foránea se relaciona con el campo 'id' del modelo UserModel
      },
    },
    id_profesor: {
      type: DataTypes.INTEGER,
      allowNull: true, // Opcional
      references: {
        model: ProfesorModel, // Modelo de usuario
        key: 'id',        // La clave foránea se relaciona con el campo 'id' del modelo UserModel
      },
    },
    materia: {  
      type: DataTypes.STRING,
      allowNull: false,
    },
    salon: {  
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY, 
      defaultValue: () => moment().tz('America/Bogota').format('YYYY-MM-DD'),
    },
    hora_entrada: {
      type: DataTypes.TIME, // Cambiado a TIME
      defaultValue: () => moment().tz('America/Bogota').format('HH:mm:ss'), // Solo la hora
    },
    hora_salida: {
      type: DataTypes.TIME, // Cambiado a TIME
      allowNull: true,
    },
  },
  {
    tableName: "asistencias",
    sequelize: database,
    timestamps: false,
  }
);
