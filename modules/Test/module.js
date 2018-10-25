Module = require('components/module')

class Test extends Module {
    constructor(){
        super();
        
        this.testing = new this.Command(
            'test',
            'test',
            false,
            function(msg,arg){
                msg.reply('test');
            }
        )
    }   
}

module.exports = Test