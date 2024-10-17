import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import moment from 'moment-timezone';

export class MateriaModel extends Model {
    public id!: number;
    public nombre!: string;
    public carrera!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export interface MateriaI {
    nombre: string;
    carrera: string;
    createdAt?: Date;
    updatedAt?: Date;
}

MateriaModel.init(
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
        carrera: {
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
        tableName: "materias",
        sequelize: database,
        timestamps: false,
        hooks: {
            beforeValidate: (materia: MateriaModel) => {
                if (typeof materia.nombre === "string") materia.nombre = materia.nombre.trim().toLocaleUpperCase();
                if (typeof materia.carrera === "string") materia.carrera = materia.carrera.trim().toLocaleUpperCase();
            },
        
            beforeUpdate: (materia: MateriaModel) => {
                materia.updatedAt = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
            },
        },
    }
);
