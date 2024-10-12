const Sequelize = require('sequelize');

const DB_NAME = 'bd_proyecto';

const DB_USER = 'admin';

const DB_PASS = 'Darwin123.';



export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,

    {
        host: '158.247.127.59',
        dialect: 'mysql',
        port: 3306
    }

);


async function generateDb() {
    await database.sync({ force: false})
    console.log('Base de datos y tablas creada');
}

generateDb();
