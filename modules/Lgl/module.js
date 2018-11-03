import Module from "components/module";
import Discord from "discord.js"
import Game from "./Game.js";

export default class Lgl extends Module {
    constructor() {
        super()
        this.config = {
            name: "Lgl",
            description: 'A highly customizable board game to play with friends, now on Discord!'
        };

        this.gamesList = new Discord.Collection();
        this.minimumPlayers = 4;
        this.format = bot.Core.fontFormat;
        this.roleManager = bot.Lgl.roleManager;
        this.gameStatus = bot.Lgl.gameStatus;
        this.availableRoles = this.submodule.roles

        this.lgRoleList = new this.Command(
            '<role:optional>',
            "Show all roles and their description, can specify which role description you want to see (WIP)",
            [{ type: 'string', optional: "true" }],
            (msg, arg) => {
            var compoPanel = new Discord.RichEmbed()
                .setTitle('Role list')
                .setFooter('Requested by ' + msg.author.username)
                .setTimestamp()
                .setColor('LUMINOUS_VIVID_PINK');
            Object.values(this.availableRoles).forEach(element => {
                element = new element();
                compoPanel.addField(element.name, element.description);
            });
            msg.reply(compoPanel);
        })
        this.lgShow = new this.Command(
            '<name of the party:optional if you made a party>',
            "Show a party's information",
            [{ type: 'string', optional: 'true' }],
            (msg, arg) => {
            if (arg == '') {
                var game = this.gamesList.get(msg.author);
                if (game) {
                    var partyPanel = this.gameStatus.showPartyPanel(new Discord.RichEmbed(), this.format, game);
                    msg.reply(partyPanel);
                    return true;
                }
                msg.reply('error message 1');
                return false;
            }
            var game = this.gamesList.find(game => game.name == arg[0]);
            if (game) {
                var partyPanel = this.gameStatus.showPartyPanel(new Discord.RichEmbed(), this.format, game);
                msg.reply(partyPanel);
                return true;
            }
            msg.reply('error message 2');
        })
        this.lgCreate = new this.Command(
            '<name of the party> <number of players>',
            'Create a party to play Loup-Garoux, must have at least 4 players. Only 1 salon may be created or joined by a player.',
            [{ type: 'string' }, { type: 'number' }],
            (msg, arg) => {
                if (this.gameStatus.checkIfPlayerCanJoin(this.gamesList, msg.author)) {
                    msg.reply('error msg');
                    return false;
                }
                //Check if the minimum requirement of players seat is met
                if (arg[1] < this.minimumPlayers) {
                    msg.reply('wrong2');
                    return false;
                }
                //Create the game and store it in a list
                var game = new Game(arg[0], arg[1], msg, bot, Discord);
                this.roleManager.makeDefaultCompo(this.availableRoles,game)
                this.gamesList.set(msg.author, game);
                //Create a panel and send it
                var partyPanel = this.gameStatus.showPartyPanel(new Discord.RichEmbed(), this.format, game);
                msg.reply(partyPanel);
            });

            this.lgJoin = new this.Command(
            '<party name>',
            'Join a Loup Garou party',
            [{ type: 'string' }],
            (msg, arg) => {
            if (this.gameStatus.checkIfPlayerCanJoin(this.gamesList, msg.author)) {
                msg.reply('error msg');
                return false;
            }
            var game = this.gameStatus.checkIfGameExists(this.gamesList, arg[0]);
            if (!game) {
                msg.reply('error msg 2');
            }
            game.playersList.push(msg.author);
            msg.reply('party joined');
        })
        this.lgDelete = new this.Command(
            '',
            'Delete the game you made',
            false,
            (msg, arg) => {
            if (!this.gamesList.has(msg.author)) {
                msg.reply('You have no current games');
                return false;
            }
            this.gamesList.delete(msg.author);
            msg.reply('Game deleted');
        })
        this.lgUpdate = new this.Command(
            '<"name" or "playernumber"><new name or number of players>',
            'Change the parameters of the game',
            [
                { type: 'string' }, { type: 'string' },
                { type: 'string', optional: "true" },
                { type: 'string' }
            ],
            (msg, arg) => {
                if (!this.gamesList.has(msg.author)) {
                    msg.reply('Error message 1');
                    return false;
                }
                for (var i = 0; i < arg.length; i++) {
                    if (arg[i] != 'name' && (i + 2) % 2 == 0 && arg[i] != 'playernumber' && (i + 2) % 2 == 0) {
                        msg.reply('Error message 2 ' + i);
                    }
                    if (arg[i] == 'name' && arg[i + 1]) {
                        this.gamesList.get(msg.author).name = arg[i + 1];
                    }
                    if (arg[i] == 'playernumber' && arg[i + 1]) {
                        if (isNaN(arg[i + 1])) {
                            msg.reply('Error Message 3 ' + i);
                        }
                        if (arg[i + 1] < this.minimumPlayers) {
                            msg.reply('Not enough players');
                        }
                        this.gamesList.get(msg.author).maxPlayerNumber = arg[i + 1];
                    }
                }
                var partyPanel = this.gameStatus.showPartyPanel(new Discord.RichEmbed(), this.format, this.gamesList.get(msg.author));
                msg.reply(partyPanel);
            }
        );
        this.lgCompo = new this.Command(
            '<"add","remove","full"> <(role) (quantity):endless>',
            'Can add other roles over villagers, remove roles replacing them with villagers, or edit the full composition.',
            [{type:'string'},{type:'string'},{type:'number', endless:3}],
            (msg,arg) => {
                msg.reply('kay')
            }
        )    
    }
} 