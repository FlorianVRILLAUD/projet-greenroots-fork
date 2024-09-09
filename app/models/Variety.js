import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

class Variety extends Model {}

Variety.init(
    {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize: sequelize(),
        tableName: 'variety',
    }
);

export { Variety };