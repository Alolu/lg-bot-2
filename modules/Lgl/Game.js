class Game {
    constructor(name,maxPlayerNumber,msg,bot,Discord){
        this.name = name;
        this.maxPlayerNumber = maxPlayerNumber;
        this.msg = msg;
        this.guild = msg.guild;
        this.leader = msg.author;
        this.bot = bot;
        this.Discord = Discord;
        this.playersList = []

        this.playersList.push(this.leader);
    }
}

module.exports = Game;