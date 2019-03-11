const fs = require('fs');
const path = require('path');
import ModuleClass from 'components/module'

var Discord;

class Command {
    constructor(usage, description, args, process) {
        this.usage = usage;
        this.description = description;
        this.process = process;
        this.args = args;
        this.module = '';
    }

    setModule(module) {
        this.module = module;
    }
}

//! A ameliorer en creant un classe module + fonction invoque automatiquement.
//! Ajouter un module pour ameliorer les Import aussi ou utiliser un workaround a voir.
export default class Commands {
    constructor(discord, folder, bot) {
        Discord = discord;
        bot.commands = new Discord.Collection();
        this.moduleList = new Discord.Collection();
        this.plugin_dir = folder + "/";
    }

    async load_commands(){
        console.log('Loading modules...')
        this.plugin_folders = this.getDirectories(path.join('.',this.plugin_dir));
        await this.preload_modules()
        this.init_modules()
        console.log('All modules loaded.')
    }

    async preload_modules(){
        for(var moduleFolder of this.plugin_folders){
            var Module = await this.CheckIfModuleIn(moduleFolder)
            if(Object.getPrototypeOf(Module) === ModuleClass){
                this.getSubmodules(moduleFolder,Module)
                bot = Module.setCommand(Command,bot)
                Module.getUtil(path.join(this.plugin_dir,moduleFolder,bot.utilFolder),bot)
                this.moduleList.set(moduleFolder,Module)
            } 
        }
    }

    async CheckIfModuleIn(moduleFolder){
        try {
            //var Module = require(path.join(this.plugin_dir,moduleFolder,bot.moduleFile))
            var Module = await import(path.join(this.plugin_dir,moduleFolder,bot.moduleFile))
            return Module.default
        }
        catch (err) {
            console.log(err)
            return false
        }
    }

    async init_modules(){
        var commandList = {}

        this.moduleList.forEach((Module,key)=>{
            console.log('├──' + Module.name)
            Module.setBot(bot)
            var module = new Module()
            Object.assign(commandList,module.getCommands())
            bot.modules.set(key,module)
        })

        bot.commands = new Discord.Collection(Object.entries(commandList))
        this.commandCount = bot.commands.length
        
    }

    getDirectories(srcpath) {
        return fs.readdirSync(srcpath).filter(function (file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    };

    //? A finir
    getSubmodules(moduleFolder,Module) {
        
        var submodulesDir = path.join(this.plugin_dir, moduleFolder, 'submodules');

        if (fs.existsSync(submodulesDir)) {
            var submoduleObject = {}
            fs.readdirSync(submodulesDir).forEach(folder => {
                
                var Submodules = {}
                
                fs.readdirSync(path.join(submodulesDir, folder)).forEach(file => {
                    var Submodule = require('../' + path.join(submodulesDir, folder, file))
                    Object.assign(Submodules,{[Submodule.name] : Submodule})
                });

                Object.assign(submoduleObject,{[folder]: Submodules})
            });

            if(submoduleObject != {}){
                Module.setSubmodule(submoduleObject);
            }
        }
    };
}

module.exports = Commands;