import 'dotenv/config';

import { Sequelize } from 'sequelize';

function sequelize() {
    const connexion = new Sequelize(process.env.PG_URL, {
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