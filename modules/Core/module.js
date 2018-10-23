var that;

class Core {
    constructor(Discord, bot, Command) {
        bot.core = {};
        this.Discord = Discord;
        that = this;
        this.config = {
            name: 'Core',
            description: 'All the essentials commands and function to make the bot work!'
        };
        this.setBot = function (bot) {
            this.bot = bot;
            this.format = this.bot.core.format;
        };
        this.listCommands = function (module, helpPanel) {
            helpPanel.addField(that.format.bolden(module.config.name), that.format.surlign(that.format.italics(module.config.description)));
            commands = bot.commands.filter(command => command.module == module.config.moduleName);
            commands.forEach(function (command, key) {
                helpPanel.addField(bot.prefix + key + ' : ' + command.description, that.format.code(bot.prefix + key + ' ' + command.usage));
            });
            helpPanel.addBlankField();
        };
        this.help = new Command('<module or command:optional>', 'List every commands if no module are specified, else list all commands from the specified module. Can also help for one command if a command is specified instead', [{ type: "string", optional: true }], function (msg, arg) {
            var helpPanel = new Discord.RichEmbed()
                .setTitle('Help message!')
                .setFooter('Requested by ' + msg.author.username)
                .setTimestamp()
                .setColor('LUMINOUS_VIVID_PINK');
            helpPanel.addBlankField();
            if (arg) {
                module = bot.modules.find(module => module.config.name == arg);
                command = bot.commands.get(arg[0]);
                if (module) {
                    that.listCommands(module, helpPanel);
                }
                else if (command) {
                    helpPanel.addField(bot.prefix + arg + ' : ' + command.description, that.format.code(bot.prefix + arg + ' ' + command.usage));
                }
                else {
                    this.process(msg, false);
                    msg.reply('There is no modules or commands with this name, see the list here');
                    return false;
                }
            }
            else {
                bot.modules.forEach(function (module) {
                    that.listCommands(module, helpPanel);
                });
            }
            msg.reply(helpPanel);
        });
    }
}

module.exports = Core;