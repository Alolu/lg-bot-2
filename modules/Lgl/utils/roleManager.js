function RoleManager(bot){
    
    this.getRoles = function(){
        return true; 
    }

    bot.lgl.roleManager = this;
}

module.exports = RoleManager;