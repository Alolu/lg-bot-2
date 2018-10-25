class Module {
    constructor(){
        this.config = {
            name: '',
            description: ''
        }
    }

    setBot(bot) {
        this.bot = bot;
        var that = this
    }
}

module.exports = Module