import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

class UserHasTree extends Model {}

UserHasTree.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        tree_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize(),
        tableName: 'user_has_tree'
    }
);

export { UserHasTree };