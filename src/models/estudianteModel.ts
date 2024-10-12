import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import bcryptjs from 'bcryptjs';
import moment from 'moment-timezone';

export class EstudianteModel extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public carrera!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export interface EstudianteI {
  nombre: string;
  email: string;
  password: string;
  carrera: string;
  createdAt?: Date;
  updatedAt?: Date;
}

EstudianteModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrera: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: () => moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: () => moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  {
    tableName: "estudiantes",
    sequelize: database,
    timestamps: false,
    hooks: {
      beforeValidate: (estudiante: EstudianteModel) => {
        if (typeof estudiante.email === "string") estudiante.email = estudiante.email.trim().toLowerCase();
      },
      beforeCreate: async (estudiante: EstudianteModel) => {
        estudiante.password = await bcryptjs.hash(estudiante.password, 8);
      },
      beforeUpdate: async (estudiante: EstudianteModel) => {
        if (estudiante.changed("password")) {
          estudiante.password = await bcryptjs.hash(estudiante.password, 8);
        }
        estudiante.updatedAt = moment().tz('America/Bogota').toDate();
      },
    },
  }
);
