import PlayerObject from "./playerObject"
const PO = new PlayerObject();

export default class Player {
    constructor(id){
        this._id = id
        this.inventory = {}
        this.joinDate = new Date();

        return this
    }

    async loadPlayerData(){
        let player = await PO.getPlayer(this._id)
        player? this.setPlayer(player) : this.newPlayer();
    }

    setPlayer(player){
        this._id = player._id
        this.joinDate = player.joinDate
        this.inventory = player.inventory
    }

    newPlayer(){
        let player = {
            _id: this._id,
            inventory: this.inventory, 
            joinDate: this.joinDate
        }
        PO.insertPlayer(player)
    }


}