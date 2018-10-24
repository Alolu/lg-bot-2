var bot,prefix,Discord,Mention;

function checkBotMentionOrSelfPrefix(msg){
    if(msg.author.id == bot.user.id || !msg.content.startsWith(prefix)){
        if(msg.author != bot.user && msg.isMentioned(bot.user)){
            msg.reply('Please use ' + prefix + 'help to get a list of commands you can use.')
            return true;
        }
        return true;
    } else {
        return false;
    }
}

function checkIfCommandExist(cmdTxt){
    var cmd = bot.commands.get(cmdTxt);
    if(cmd){
        return cmd;
    }
    return false;
}

function checkArgs(argsList,args,msg,errMsg){
	try{
		console.log("Checking arguments")
		var duration;
        var endless = false;
        if(!argsList){
            return true;
        }
		if(args.length<argsList.length){
			duration = argsList.length;
		}else{
			duration = args.length;
		}
		for(var i = 0; i < duration; i++){
			var arg = args[i];
			var argPattern = argsList[i];
			var n = (i+1);

			// check if the previous pattern was an endless type
			if(endless){
				argPattern = argsList[i - endless];
			}

			console.log(argPattern,arg,i + " " + endless);

			if(argPattern == null && arg){
				msg.reply("\nIl y'a trop de parametres!" + errMsg)
				return false;
			}
			//if pattern is endless assign current i to endless var
			if(argPattern.endless && endless){
				endless += argPattern.endless;
			}
			if(argPattern.endless && !endless){
				endless = argPattern.endless;
			}
			if(!argPattern.optional && !arg){
				msg.reply("\nIl n'y a pas assez de parametres!" + errMsg)
				return false;
			}
			if(argPattern.optional && !arg){
				return true;
			}
			if(argPattern.type == "number" && isNaN(arg)){
				msg.reply("\nle parametre numero " + n +" doit être un numero!" + errMsg)
				return false;
			}
			if(argPattern.type == "string" && arg.match(Mention.USERS_PATTERN)){
				msg.reply("\nle parametre numero " + n + " doit être une chaine de caractere! (Pas de mention)" + errMsg)
				return false;
			}
			if(argPattern.type == "mention" && !arg.match(Mention.USERS_PATTERN)){
				msg.reply("\nle parametre numero " + n + " doit être une mention!" + errMsg)
				return false;
			}
		}
		return true;
	}catch(e){
		console.log(e.stack);
		return false;
	}
}

class Args {
	constructor(Bot, discord) {
		bot = Bot;
		prefix = bot.prefix;
		Discord = discord;
		Mention = Discord.MessageMentions;
		this.checkForCommands = function (msg) {
			//If user is mentionning the bot instead of using the prefix
			//OR the bot is using the prefix itself
			if (checkBotMentionOrSelfPrefix(msg)) {
				return false;
			}
			//Splitting the command and the suffixes
			var cmdTxt = msg.content.split(" ")[0].substr(prefix.length);
			var suffix = msg.content.substr(cmdTxt.length + prefix.length + 1);
			//Checking if the command exists
			var cmd = checkIfCommandExist(cmdTxt);
			if (!cmd) {
				msg.reply('Cette commande n\'existe pas.');
				return false;
			}
			//Checking if the arguments are as asked
			var args = suffix.split(' ');
			var errMsg = "\n" + cmd.usage + "\n" + cmd.description;
			if (!checkArgs(cmd.args, args, msg, errMsg)) {
				return false;
			}
			//Run the command
			cmd.process(msg, args);
		};
	}
}

module.exports = Args;

