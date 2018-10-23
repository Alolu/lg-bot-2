Villageois = require('./Villageois');

class LoupGarou extends Villageois {
    constructor(player,game){
        super(player,game);
        this.name = 'Loup-garou';
        this.description = 'Can vote to eat one player every end of turns';
    }
}

module.exports = LoupGarou;