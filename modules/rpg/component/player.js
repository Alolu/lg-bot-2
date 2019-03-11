import PlayerObject from "./playerObject"
const PO = new PlayerObject();

export default class Player {
    constructor(id){
        player = PO.getPlayer(id);
        if(!player){
            let player = {
                _id:id,
                joinDate: new Date(),
                inventory: {}
            }
            PO.insertPlayer(player)
        }
    }
    toString(){
        console.log(player)
    }
}