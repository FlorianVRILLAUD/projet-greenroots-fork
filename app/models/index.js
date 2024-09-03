import { Command } from './Command.js'
import { CommandHasTree } from './CommandHasTree.js'
import { Tree } from './Tree.js'
import { User } from './User.js'

//* User & Command

User.hasMany(Command, {
    as: 'commands',
    foreignKey: 'user_id',
});



export { Command, CommandHasTree, Tree, User}