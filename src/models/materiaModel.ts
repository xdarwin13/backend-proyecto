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
            defaultValue: () => moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: () => moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss'),
        },
    },
    {
        tableName: "materias",
        sequelize: database,
        timestamps: false,
        hooks: {
            beforeValidate: (materia: MateriaModel) => {
                if (typeof materia.nombre === "string") materia.nombre = materia.nombre.trim();
                if (typeof materia.carrera === "string") materia.carrera = materia.carrera.trim();
            },
            beforeCreate: (materia: MateriaModel) => {
                materia.createdAt = moment().tz('America/Bogota').toDate();
            },
            beforeUpdate: (materia: MateriaModel) => {
                materia.updatedAt = moment().tz('America/Bogota').toDate();
            },
        },
    }
);
