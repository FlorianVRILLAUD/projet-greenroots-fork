import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

class CommandHasTree extends Model {}

CommandHasTree.init(
    {
        command_id: DataTypes.INTEGER,
        tree_id: DataTypes.INTEGER,
    },
    {
        sequelize: sequelize(),
        tableName: 'command_has_tree'
    }
);

export { CommandHasTree };