var command;
class Module {
    constructor(){
        var that = this;
        this.Command = command;
        this.config = {
            name: 'Test',
            description: 'un test'
        }
    }

    static setCommand(Command,bot){
        command = Command;

        var utilVar = {
            [this.name]: { lol : 3}
        }
        var newBot = Object.assign(bot,utilVar);
        console.log(newBot);

        return newBot;
    }

    setBot(bot) {
        this.bot = bot;
        console.log(this.constructor.name);
    }
}

module.exports = Module