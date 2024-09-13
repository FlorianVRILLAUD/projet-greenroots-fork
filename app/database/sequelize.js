import 'dotenv/config';

import { Sequelize } from 'sequelize';

function sequelize() {
    const connexion = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST || process.env.DB_HOST_DOCKER,
        dialect: 'postgres',
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
        },
    });

    return connexion;
}

export { sequelize };