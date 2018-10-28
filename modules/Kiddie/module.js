var that

export default class Kiddie {
    constructor(Discord, bot, Command) {
        bot.kiddie = {}
        this.Discord = Discord
        this.bot = bot
        this.state = true
        this.config = {
            name: 'Kiddie',
            description: 'A module to make the bot as annoying as a kid'
        }

        bot.on('message', function (msg) {
            if (that.state) {
                var number = that.util.random(10);
                console.log(number);
                switch (number) {
                    case 9:
                    case 10:
                        that.util.saySomething(this.reponses);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    
    setBot(bot){
        this.bot = bot
        this.util = bot.kiddie.util
        that = this
    }
}

module.exports = Kiddie;