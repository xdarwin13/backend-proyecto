const Sequelize = require('sequelize');

const DB_NAME = 'bd_proyecto';

const DB_USER = 'admin';

const DB_PASS = 'Darwin123.';



export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,

    {
        host: '3.20.227.234',
        //host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        //timezone: '-05:00',
    }

);


async function generateDb() {
    await database.sync({ alter: true})
    console.log('Base de datos y tablas creada');
}

generateDb();
