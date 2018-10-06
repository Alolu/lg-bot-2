const fs = require('fs');
const path = require('path');
var Discord;

function Command(usage,description,args,process){
    this.usage = usage;
    this.description = description;
    this.process = process;
    this.args = args;
    this.module = '';

    this.setModule = function(module){
        this.module = module;
    }
}

function Commands(discord,folder,bot){
    
    this.plugin_dir = "./" + folder + "/";
    Discord = discord;
    bot.commands = new Discord.Collection();

    //Function to get all directories in a folder
    this.getDirectories = function(srcpath){
        return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath,file)).isDirectory();
        });
    }

    //Function to load all commands from all modules
    this.load_commands = function(){
        var commandCount = 0;
        this.plugin_folders = this.getDirectories(this.plugin_dir);

        //Loop through all folders inside the module folder
        console.log('Loading modules :')
        for(var i = 0; i < this.plugin_folders.length; i++){
            
            var pluginFolder = this.plugin_folders[i]; 

            //Checks if there's a class inside a module.js file.
            var Plugin;
            try{
                Plugin = require('../' + this.plugin_dir + pluginFolder + '/module.js')
            }catch(err){
                console.log("File not found in "  + err)
            }

            //Instanciate the class found and record the module in a collection
            if(Plugin){
                console.log('┃ ' + pluginFolder)

                plugin = new Plugin(Discord,bot,Command);
                bot.modules.set(pluginFolder,plugin);
                
                pluginName = Object.getOwnPropertyNames(plugin);
                pluginFunctions = Object.values(plugin);
                plugin.config.moduleName = pluginFolder;

                //Loop through all attributes inside the instanciated class
                for(var j = 0; j < pluginFunctions.length; j++){

                    //Record the attribute inside a collection if it belongs to the Command class
                    if(pluginFunctions[j] instanceof Command){
                        console.log('┝━ ' + pluginName[j])

                        pluginFunctions[j].setModule(pluginFolder);
                        bot.commands.set(pluginName[j],pluginFunctions[j]);
                        commandCount++;
                    }
                }
            }

            //Add optional utilitaries function to the bot var
            if(fs.existsSync(this.plugin_dir + pluginFolder + '/utils')){
                fs.readdirSync(this.plugin_dir + pluginFolder + '/utils').forEach(file => {
                    var Util = require('../' + this.plugin_dir + pluginFolder + '/utils/' + file);
                    util = new Util(bot);
                })
            }
            
        }
        console.log('Setting bot...');
        bot.modules.forEach(module => {
            if(module.setBot){
                module.setBot(bot);
            }
        })

        console.log(commandCount + ' commands loaded.')
    }

}

module.exports = Commands;