import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import bcryptjs from 'bcryptjs';


export class AdminModel extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export interface AdminI {
  nombre: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

AdminModel.init(
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
      defaultValue: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })),
    },
  },
  {
    tableName: "administradores",
    sequelize: database,
    timestamps: false,
    hooks: {
      beforeValidate: (admin: AdminModel) => {
        if (typeof admin.email === "string") admin.email = admin.email.trim().toLowerCase();
      },
      beforeCreate: async (admin: AdminModel) => {
        admin.password = await bcryptjs.hash(admin.password, 8);
      },
      beforeUpdate: async (admin: AdminModel) => {
        if (admin.changed("password")) {
          admin.password = await bcryptjs.hash(admin.password, 8);
        }
        admin.updatedAt = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
      },
    },
  }
);
