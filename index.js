//INIT
//Node Modules
require('app-module-path').addPath(__dirname);
const Discord = require('discord.js');

//Config
const config = require("./config");

//Components
const Args = require('./components/args');
const Commands = require('./components/commands')

//Constants
const botName = 'Alice';
const modulesFolder = 'modules';

//Bot attributes
bot = new Discord.Client();
bot.modules = new Discord.Collection();
bot.prefix = '.';
bot.moduleFile = 'module.js'
bot.utilFolder = 'utils'

//Components instancing
bot.commandManager = new Commands(Discord,modulesFolder,bot);
bot.args = new Args(bot,Discord);
//ENDINIT


//BOT START//
bot.login(config.botId);
bot.on('ready', function(){
    console.log("Initialisation starting...");
    bot.commandManager.load_commands();
    console.log("All commands loaded");

    bot.user.setActivity(bot.prefix + 'help');

    console.log(botName + " is now on.");
})
bot.on('message',(msg) => {
    bot.args.checkForCommands(msg);
})
//