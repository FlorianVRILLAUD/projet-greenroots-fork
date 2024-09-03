import { Command } from './Command.js'
import { CommandHasTree } from './CommandHasTree.js'
import { Tree } from './Tree.js'
import { User } from './User.js'

//* User & Command

User.hasMany(Command, {
    as: 'commands',
    foreignKey: 'user_id',
});

Command.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id',
});

//* Command & Tree

Command.belongsToMany(Tree, {
    foreignKey: 'command_id',
    otherKey: 'tree_id',
    through: CommandHasTree,
    as: 'trees',
});

Tree.belongsToMany(Command, {
    foreignKey: 'tree_id',
    otherKey: 'command_id',
    through: CommandHasTree,
    as: 'commands',
});


export { Command, CommandHasTree, Tree, User};