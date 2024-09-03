import { Command, CommandHasTree, Tree, User} from './index.js';

// async function getAll() {
//         const commands = await Command.findByPk(1,
//             {include: 'user'}
//         );
//         console.log(commands.user);
// }

// getAll();

/*async function getAll() {
    const commands = await CommandHasTree.findAll(
        {include: 'trees'}
    );
    console.log(commands);
}*/

// getAll();

async function getTreeInCommand() {
    const commandd = await Command.findByPk(1, {
        include: [{
            model: Tree,
            as: 'trees',
            through: CommandHasTree
        }]
    })
    console.log(commandd.trees);
}
getTreeInCommand();
