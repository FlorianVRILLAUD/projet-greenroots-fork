import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

class User extends Model {}

User.init(
    {
        role: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },

        lastname: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },

        firstname: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },

        adress: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        sequelize: sequelize(),
        tableName: 'user',
    }
);

export { User };