import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

//"tree" class inherits from the sequelize “Model” public class
class Tree extends Model {}

//Initialize Tree model with its attributes and options (data)
Tree.init(
    {
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        },
        
        slug: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        },

        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        variety: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        
        size: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        price_ht: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        price_ttc : {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },

        origin: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
    },
    {
        sequelize: sequelize(), 
        tableName: 'tree', // name of the table in database
    }
);

export { Tree };

