function Lgl(Discord,bot,Command){

    this.Discord = Discord;
    this.bot = bot;

    this.config = {
        name : "Loup-Garoux",
        description : 'A highly customizable board game to play with friends, now on Discord!'
    }

    this.setBot = function(bot){
        this.bot = bot;
    }

    this.test = new Command(
        "<test>",
        "commande test",
        [{type: "string", optional: false}],
        function(msg,arg){
            msg.reply(arg);
        }
    )

    this.test2 = new Command(
        "<test>",
        "commande test 2",
        false,
        function(msg,arg){
            msg.channel.send('test2');
        }
    )
}

module.exports = Lgl;