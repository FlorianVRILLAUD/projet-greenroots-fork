import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

class CommandHasTree extends Model {}

CommandHasTree.init(
    {
        command_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        tree_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: sequelize(),
        tableName: 'command_has_tree'
    }
);

export { CommandHasTree };