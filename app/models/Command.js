import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

class Command extends Model {}

Command.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        total_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize(),
        tableName: 'command',
    }
);

export { Command };