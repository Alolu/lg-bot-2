export default class Game {
    constructor(name,maxPlayerNumber,msg,bot,Discord){
        this.name = name
        this.maxPlayerNumber = maxPlayerNumber
        this.compo = new Discord.Collection()
        this.guild = msg.guild
        this.leader = msg.author
        this.bot = bot
        this.playersList = []

        this.playersList.push(this.leader)
    }
}
