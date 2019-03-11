import Module from "components/module";
import Player from "./component/player";
export default class rpg extends Module {
    constructor(){
        super()
        this.config = {
            name: "rpg",
            description: "A module to make your own text-based RPG"
        }
        this.rpgStart = new this.Command(
            "placeholder",
            "placeholder",
            false,
            async (msg,arg) => {
                player = new Player(msg.author.id)
                player.toString()
            }
        )
    }
}