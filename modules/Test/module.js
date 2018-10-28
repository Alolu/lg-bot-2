import Module from "components/module";

class Test extends Module {
    constructor(){
        super();
        
        this.testing = new this.Command(
            'test',
            'test',
            false,
            (msg,arg) => {
                msg.reply('test')
            }
        )
        this.testing2 = new this.Command(
            'test',
            'test',
            false,
            (msg,arg) => {
                msg.reply('test')
            }
        )
    }   
}

module.exports = Test