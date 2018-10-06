class Game {
    constructor(name,maxPlayerNumber,msg,bot){
        this.name = name;
        this.maxPlayerNumber = maxPlayerNumber;
        this.msg = msg;
        this.guild = msg.guild;
        this.leader = msg.author;
        this.bot = bot;
    }
}

module.exports = Game;