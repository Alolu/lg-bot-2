class RoleManager {
    constructor(bot) {
        bot.Lgl.roleManager = this;
    }
    makeDefaultCompo(role,game){
        var wolvesNum = Math.ceil(game.maxPlayerNumber * 0.15)
        console.log(wolvesNum)
        game.compo.set(role.LoupGarou,wolvesNum)
        game.compo.set(role.Villageois,game.maxPlayerNumber - wolvesNum)
    }
}

module.exports = RoleManager;