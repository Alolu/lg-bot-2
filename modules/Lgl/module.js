var Game = require('./Game.js');

class Lgl {
    constructor(Discord, bot, Command) {
        bot.lgl = {};
        this.Discord = Discord;
        this.bot = bot;
        this.minimumPlayers = 4;
        this.gamesList = new Discord.Collection();
        this.config = {
            name: "Loup-Garoux",
            description: 'A highly customizable board game to play with friends, now on Discord!'
        };
        this.setBot = function (bot) {
            this.bot = bot;
            this.format = this.bot.core.format;
            this.roleManager = this.bot.lgl.roleManager;
            this.gameStatus = this.bot.lgl.gameStatus;
            this.availableRoles = this.submodule.filter(submodule => submodule.type == 'roles');
            var that = this;
        };
        this.lgRoleList = new Command('<role:optional>', "Show all roles and their description, can specify which role description you want to see (WIP)", [{ type: 'string', optional: "true" }], function (msg, arg) {
            compoPanel = new Discord.RichEmbed()
                .setTitle('Role list')
                .setFooter('Requested by ' + msg.author.username)
                .setTimestamp()
                .setColor('LUMINOUS_VIVID_PINK');
            that.availableRoles.forEach(element => {
                element = new element();
                compoPanel.addField(element.name, element.description);
            });
            msg.reply(compoPanel);
        });
        this.lgShow = new Command('<name of the party:optional if you made a party>', "Show a party's information", [{ type: 'string', optional: 'true' }], function (msg, arg) {
            if (arg == '') {
                game = that.gamesList.get(msg.author);
                if (game) {
                    partyPanel = that.gameStatus.showPartyPanel(new Discord.RichEmbed(), that.format, game);
                    msg.reply(partyPanel);
                    return true;
                }
                msg.reply('error message 1');
                return false;
            }
            game = that.gamesList.find(game => game.name == arg[0]);
            if (game) {
                partyPanel = that.gameStatus.showPartyPanel(new Discord.RichEmbed(), that.format, game);
                msg.reply(partyPanel);
                return true;
            }
            msg.reply('error message 2');
        });
        this.lgCreate = new Command('<name of the party> <number of players>', 'Create a party to play Loup-Garoux, must have at least 4 players. Only 1 salon may be created or joined by a player.', [{ type: 'string' }, { type: 'number' }], function (msg, arg) {
            if (that.gameStatus.checkIfPlayerCanJoin(that.gamesList, msg.author)) {
                msg.reply('error msg');
                return false;
            }
            //Check if the minimum requirement of players seat is met
            if (arg[1] < that.minimumPlayers) {
                msg.reply('wrong2');
                return false;
            }
            //Create the game and store it in a list
            game = new Game(arg[0], arg[1], msg, bot, Discord);
            that.gamesList.set(msg.author, game);
            //Create a panel and send it
            partyPanel = that.gameStatus.showPartyPanel(new Discord.RichEmbed(), that.format, game);
            msg.reply(partyPanel);
        });
        this.lgJoin = new Command('<party name>', 'Join a Loup Garou party', [{ type: 'string' }], function (msg, arg) {
            if (that.gameStatus.checkIfPlayerCanJoin(that.gamesList, msg.author)) {
                msg.reply('error msg');
                return false;
            }
            game = this.gameStatus.checkIfGameExists(that.gamesList, arg[0]);
            if (!game) {
                msg.reply('error msg 2');
            }
            game.playersList.push(msg.author);
            msg.reply('party joined');
        });
        this.lgDelete = new Command('', 'Delete the game you made', false, function (msg, arg) {
            if (!that.gamesList.has(msg.author)) {
                msg.reply('You have no current games');
                return false;
            }
            that.gamesList.delete(msg.author);
            msg.reply('Game deleted');
        });
        this.lgUpdate = new Command('<"name" or "playernumber"><new name or number of players>', 'Change the parameters of the game', [{ type: 'string' }, { type: 'string' },
        { type: 'string', optional: "true" }, { type: 'string' }], function (msg, arg) {
            if (!that.gamesList.has(msg.author)) {
                msg.reply('Error message 1');
                return false;
            }
            for (var i = 0; i < arg.length; i++) {
                if (arg[i] != 'name' && (i + 2) % 2 == 0 && arg[i] != 'playernumber' && (i + 2) % 2 == 0) {
                    msg.reply('Error message 2 ' + i);
                }
                if (arg[i] == 'name' && arg[i + 1]) {
                    that.gamesList.get(msg.author).name = arg[i + 1];
                }
                if (arg[i] == 'playernumber' && arg[i + 1]) {
                    if (isNaN(arg[i + 1])) {
                        msg.reply('Error Message 3 ' + i);
                    }
                    if (arg[i + 1] < that.minimumPlayers) {
                        msg.reply('Not enough players');
                    }
                    that.gamesList.get(msg.author).maxPlayerNumber = arg[i + 1];
                }
            }
            partyPanel = that.gameStatus.showPartyPanel(new Discord.RichEmbed(), that.format, that.gamesList.get(msg.author));
            msg.reply(partyPanel);
        });
    }
}

module.exports = Lgl;