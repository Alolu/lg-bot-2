import Module from "components/module";
import Discord from "discord.js"

export default class Core extends Module {
    constructor() {
        super()
        this.config = {
            name: 'Core',
            description: 'All the essentials commands and function to make the bot work!'
        };

        this.format = bot.Core.fontFormat
        
        this.help = new this.Command(
            '<module or command:optional>',
            'List every commands if no module are specified, else list all commands from the specified module. Can also help for one command if a command is specified instead',
            [{ type: "string", optional: true }],
            (msg, arg) => {
            var helpPanel = new Discord.RichEmbed()
                .setTitle('Help message!')
                .setFooter('Requested by ' + msg.author.username)
                .setTimestamp()
                .setColor('LUMINOUS_VIVID_PINK');
            helpPanel.addBlankField();
            console.log(arg);
            if (arg[0] != '') {
                module = bot.modules.find(module => module.config.name == arg);
                console.log(bot.commands)
                var command = bot.commands.get(arg[0]);
                if (module) {
                    console.log(module)
                    this.listCommands(module, helpPanel);
                }
                else if (command) {
                    helpPanel.addField(bot.prefix + arg + ' : ' + command.description, this.format.code(bot.prefix + arg + ' ' + command.usage));
                }
                else {
                    this.process(msg, false);
                    msg.reply('There is no modules or commands with this name, see the list here');
                    return false;
                }
            }
            else {
                bot.modules.forEach((module) => {
                    this.listCommands(module, helpPanel);
                });
            }
            msg.reply(helpPanel);
        });
    }

    listCommands(module, helpPanel) {
        helpPanel.addField(this.format.bolden(module.config.name), this.format.surlign(this.format.italics(module.config.description)));
        var commands = bot.commands.filter(command => command.module == module.config.name);
        commands.forEach((command, key) => {
            helpPanel.addField(bot.prefix + key + ' : ' + command.description, this.format.code(bot.prefix + key + ' ' + command.usage));
        });
        helpPanel.addBlankField();
    };
}