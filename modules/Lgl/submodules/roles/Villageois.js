class Villageois {
    constructor(player,game){
        this.player = player;
        this.game = game;
        this.time = "end-day"
        this.name = "Villageois";
        this.description = 'Base role, no special action.';
    }

    start(){
        console.log("No setup for : " + this.name)
    }
}

module.exports = Villageois;