var Game = require('./Game.js');

function Lgl(Discord,bot,Command){

    bot.lgl = {};
    this.Discord = Discord;
    this.bot = bot;
    this.gamesList = new Discord.Collection();
    that = this;

    this.config = {
        name : "Loup-Garoux",
        description : 'A highly customizable board game to play with friends, now on Discord!'
    }

    this.setBot = function(bot){
        this.bot = bot;
        this.format = this.bot.core.format;
        this.roleManager = this.bot.lgl.roleManager;
    }

    this.lgCreate = new Command(
        '<name of the salon> <number of players>',
        'Create a salon to play Loup-Garoux, must have at least 4 players. Only 1 salon may be created or joined by a player.',
        [{type:'string'},{type:'number'}],
        function(msg,arg){
            //Check if user is not a leader of a current game
            if(that.gamesList.get(msg.author)){
                msg.reply('wrong');
                return false;
            }

            //Check if the minimum requirement of players seat is met
            if(arg[1] < 4){
                msg.reply('wrong2');
                return false;
            }

            //Create the game and store it in a list
            that.gamesList.set(msg.author,new Game(arg[0],arg[1],msg,bot));
            msg.reply('Game made');
        }
    )

    this.lgDelete = new Command(
        '',
        'Delete the game you made',
        false,
        function(msg,arg){
            if(!that.gamesList.has(msg.author)){
                msg.reply('You have no current games');
                return false;
            }

            that.gamesList.delete(msg.author);
            msg.reply('Game deleted');
        }
    )

    this.lgUpdate = new Command(
        '<"name" or "playernumber"><new name or number of players>',
        'Change the parameters of the game',
        [{type:'string'},{type:'string'},
        {type:'string',optional:"true"},{type:'string'}],
        function(msg,arg){
            if(!that.gamesList.has(msg.author)){
                msg.reply('Error message 1');
                return false;
            }

            for(var i = 0; i < arg.length; i ++){
                if(arg[i] != 'name' && (i+2)%2 == 0 && arg[i] != 'playernumber' && (i+2)%2 == 0 ){
                    msg.reply('Error message 2 '+ i);
                }
                if(arg[i] == 'name' && arg[i+1]){
                    that.gamesList.get(msg.author).name = arg[i+1];
                }
                if(arg[i] == 'playernumber' && arg[i + 1]){
                    if(isNaN(arg[i+1])){
                        msg.reply('Error Message 3 ' + i);
                    }
                    if(arg[i + 1] < 4){
                        msg.reply('Not enough players')
                    }
                    that.gamesList.get(msg.author).maxPlayerNumbers = arg[i + 1];
                }
            }
        }
    )
}

module.exports = Lgl;