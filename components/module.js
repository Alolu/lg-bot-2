import fs from 'fs'
import path from 'path'
import Discord from 'discord.js'

var command,bot
export default class Module {
    constructor(){
        this.Command = command
        this.bot = bot
        this.config = {
            name: 'DEFAULT_NAME',
            description: 'DEFAULT_DESC'
        }
    }

    getCommands(){
        return new Discord.Collection(
            this.mkObjectFromArrays(Object.getOwnPropertyNames,Object.values)
        );;
    }

    mkObjectFromArrays(key,values){
        var result
        keys.forEach((key, i) => {
            if(values[i] instanceof command){
                values[i].setModule(this.name)
                result[key] = values[i]
            }
        });
        return result
    }

    static setCommand(Command){
        command = Command

        var utilVar = {
            [this.name]: { lol : 3}
        }
        var newBot = Object.assign(bot,utilVar)
        console.log(newBot)

        return newBot
    }

    static getUtil(utilFolder){
        if(fs.existsSync(utilFolder)){
            fs.readdirSync(utilFolder).forEach((utilFile)=>{
                //import Util from path.join(utilFolder,utilFile)
                var Util = require(path.join(utilFolder,utilFile))
                new Util()
            })
        }
    }

    static setBot(Bot) {
        bot = Bot
    }
}