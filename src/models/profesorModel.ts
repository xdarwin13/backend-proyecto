import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import bcryptjs from 'bcryptjs';


export class ProfesorModel extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export interface ProfesorI {
  nombre: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

ProfesorModel.init(
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue:() => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })),
    },
  },
  {
    tableName: "profesores",
    sequelize: database,
    timestamps: false,
    hooks: {
      beforeValidate: (profesor: ProfesorModel) => {
        if (typeof profesor.email === "string") profesor.email = profesor.email.trim().toLowerCase();
      },
      beforeCreate: async (profesor: ProfesorModel) => {
        profesor.password = await bcryptjs.hash(profesor.password, 8);
      },
      beforeUpdate: async (profesor: ProfesorModel) => {
        if (profesor.changed("password")) {
          profesor.password = await bcryptjs.hash(profesor.password, 8);
        }
        profesor.updatedAt = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
      },
    },
  }
);
