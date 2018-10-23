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

//! A ameliorer en creant un classe module + fonction invoque automatiquement.

function Commands(discord,folder,bot){
    
    this.plugin_dir = folder + "/";
    Discord = discord;
    bot.commands = new Discord.Collection();

    //Function to get all directories in a folder
    this.getDirectories = function(srcpath){
        return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath,file)).isDirectory();
        });
    }

    this.checkForPlugin = function(plugin_dir,pluginFolder,Plugin){
        try{
            Plugin = require('../' + plugin_dir + pluginFolder + '/module.js')
            return Plugin;
        }catch(err){
            console.log("File not found in "  + err)
            return false;
        }
    }

    this.getCommands = function(pluginFunctions,pluginName,pluginFolder){

        var commandCount = 0;

        for(var j = 0; j < pluginFunctions.length; j++){

            //Record the attribute inside a collection if it belongs to the Command class
            if(pluginFunctions[j] instanceof Command){
                console.log('┝━ ' + pluginName[j])

                pluginFunctions[j].setModule(pluginFolder);
                bot.commands.set(pluginName[j],pluginFunctions[j]);
                commandCount++;
            }
        }

        return commandCount;
    }

    this.getUtil = function(plugin_dir,pluginFolder){
        if(fs.existsSync(plugin_dir + pluginFolder + '/utils')){
            fs.readdirSync(plugin_dir + pluginFolder + '/utils').forEach(file => {
                var Util = require('../' + plugin_dir + pluginFolder + '/utils/' + file);
                util = new Util(bot);
            })
        }
    }

    this.getSubmodules = function(plugin_dir,pluginFolder,plugin){

        submodulesDir = path.join(plugin_dir,pluginFolder,'submodules');

        //Confirm a submodile folder exists
        if(fs.existsSync(submodulesDir)){
            //Init the collection in the main module file
            plugin.submodule = new Discord.Collection();
            //Get all differents submodules types
            fs.readdirSync(submodulesDir).forEach(folder => {
                //Load all submodules for each types
                fs.readdirSync(path.join(submodulesDir,folder)).forEach(file => {
                    //Store the submodule in a collection and gives them a type
                    var Submodule = require('../' + path.join(submodulesDir,folder,file));
                    Submodule.type = folder;
                    plugin.submodule.set(file.slice(0,-3),Submodule);
                })
            })
        }
    }

    //Function to load all commands from all modules
    this.load_commands = function(){
        var commandCount = 0;
        this.plugin_folders = this.getDirectories("./" + this.plugin_dir);

        //Loop through all folders inside the module folder
        console.log('Loading modules :')
        for(var i = 0; i < this.plugin_folders.length; i++){
            
            var pluginFolder = this.plugin_folders[i]; 

            //Checks if there's a class inside a module.js file.
            var Plugin = null;
            Plugin = this.checkForPlugin(this.plugin_dir,pluginFolder)
            
            //Instanciate the class found and record the module in a collection
            if(Plugin){
                console.log('┃ ' + pluginFolder)

                plugin = new Plugin(Discord,bot,Command);
                pluginName = Object.getOwnPropertyNames(plugin);
                pluginFunctions = Object.values(plugin);
                plugin.config.moduleName = pluginFolder;

                bot.modules.set(pluginFolder,plugin);

                //Loop through all attributes inside the instanciated class
                commandCount += this.getCommands(pluginFunctions,pluginName,pluginFolder);

                //Loop through submodule
                this.getSubmodules(this.plugin_dir,pluginFolder,plugin);

                //Add optional utilitaries function to the bot var
                this.getUtil(this.plugin_dir,pluginFolder);
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