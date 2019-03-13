import Module from "components/module";
import Player from "./component/player";
import Discord from "discord.js"
export default class rpg extends Module {
    constructor(){
        super()
        this.connectedPlayers = new Discord.Collection();
        this.config = {
            name: "rpg",
            description: "A module to make your own text-based RPG"
        }
        this.rpgStart = new this.Command(
            "",
            "Open your RPG session",
            false,
            async (msg,arg) => {
                if(await this.checkForPlayer(msg)){
                    msg.reply("do something")
                    return true;
                }
                msg.reply("do nothing")
            }
        )
    }

    async checkForPlayer(msg){
        let player = this.connectedPlayers.get(msg.author.id)
        if(!player){
            player = new Player(msg.author.id)
            let ExistingPlayer = await player.loadPlayerData()
            let res
            ExistingPlayer?res = this.storeExistingPlayer(player,msg):res =this.startTutorial(player,msg)
            console.log(ExistingPlayer)
            return res
        }
        return player
    }

    storeExistingPlayer(player,msg){
        this.connectedPlayers.set(player._id,player)
        return player
    }

    startTutorial(player,msg){
        msg.reply("Welcome to the world of RPG " + msg.author.username)
        return false
    }
}