class RoleManager {
    constructor(bot) {
        this.getRoles = function () {
            dir = bot.commandManager.getDirectories('./modules/Kiddie/');
            console.log(dir);
        };
        bot.Lgl.roleManager = this;
    }
}

module.exports = RoleManager;