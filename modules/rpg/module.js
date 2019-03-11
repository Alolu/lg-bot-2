import Module from "components/module";
import Datastore from "nedb";

const rpgDb = new Datastore({filename: "db/rpgdb.db", autoload: true})

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
                let player = await this.getPlayer(msg.author.id);
                if(player){
                    console.log(player);
                    return true
                }
                this.newPlayer(msg.author.id);
                msg.reply("Welcome message")
            }
        )
        this.getPlayer = (id) => {
            return new Promise(resolve => {
                rpgDb.findOne({_id:id},(err,res)=>{
                    resolve(res);
                })
            })
        }
        this.newPlayer = (id)=>{
            let player = {
                _id: id,
                joinDate: new Date()
            }
            rpgDb.insert(player)
        }
    }
}