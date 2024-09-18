import dayjs from 'dayjs';
import { Command } from '../models/index.js'

import 'dotenv/config';

export default { 
  async showCommands (req, res) {

    if (req.session.user) {
        
        const commands = await Command.findAll({
            where: { user_id: req.session.user.id },
            include: 'trees'
        });

        res.render('allCommand', { commands, dayjs, title: "GreenRoots - Mes commandes", cssFile: "allcommands.css" })
    } else {
        res.redirect('/');
    }

  },
  
  async oneCommand (req, res) {

    if (req.session.user) {
        const commandId = req.params.id;
        const userId = req.session.user.id;
    
        const command = await Command.findOne({
            where: {
                id: commandId,
                user_id: userId
            },
            include: [
                {
                    association: 'trees',
                    include: [
                        { association: 'variety' }
                    ]
                }
            ]
        });
    
        if (!command) {
            return res.redirect('/');
        }

        res.render('detailCommand', { command, title: `GreenRoots - Commande n°${commandId}`, cssFile: "oneCommand.css" });
        
    } else {
        res.redirect('/');
    }
        
    
  }
}