import fs from 'fs'
import path from 'path'
import Discord from 'discord.js'

var command,bot,submodule
export default class Module {
    constructor(){
        this.Command = command
        this.bot = bot
        this.submodule = submodule
        this.config = {
            name: this.constructor.name,
            description: 'DEFAULT_DESC'
        }
    }

    getCommands(){
        var Commands = this.mkObjectFromArrays(Object.getOwnPropertyNames(this),Object.values(this))
        
        Object.entries(Commands).forEach(([key,value],i,arr) => {
            if(i === arr.length - 1){
                console.log('│   └──Command : '+`${key}`)
            }else{
                console.log('│   ├──Command : '+`${key}`)
            } 
        })
        return Commands
    }

    mkObjectFromArrays(keys,values){
        var result = {}
        keys.forEach((key, i) => {
            if(values[i] instanceof command){
                values[i].setModule(this.constructor.name)
                result[key] = values[i]
            }
        });
        return result
    }

    static setCommand(Command,bot){
        command = Command

        var utilVar = {
            [this.name]: {}
        }
        var newBot = Object.assign(bot,utilVar)

        return newBot
    }

    static getUtil(utilFolder,bot){
        if(fs.existsSync(utilFolder)){
            fs.readdirSync(utilFolder).forEach((utilFile)=>{
                //import Util from path.join(utilFolder,utilFile)
                var Util = require(path.join(utilFolder,utilFile))
                new Util(bot)
            })
        }
    }

    static setBot(Bot) {
        bot = Bot
    }

    static setSubmodule(Submodule){
        submodule = Submodule
    }
}