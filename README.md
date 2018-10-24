# lg-bot-2
A modular discord bot, made during my free time. 

## 1. Module creation

### 1.1 Folder structure

You can start making a module by creating a folder named after your module, and making a `module.js` file inside.  

##### Example :
````
modules
├── module1
│   └── module.js
├── module2
│   └── module.js
...
`````

### 1.2 File architecture

A module file must contain a class that is exported with `module.exports` or the ES6 counterpart.  
Preferably, the class should be named after the module.  

Inside the class, you will be able to make Commands and use built-in state functions.

##### Example :
````javascript
class Module1 {
	constructor(Discord, bot, Command) {
    	bot.module1 = {}
    	this.Discord = Discord
        this.bot = bot
    }
}	

module.exports = Module1
````
### 1.3 Utilities

You can make classes containing functions which will be shared across every modules.

##### Folder structure :
`````
module1
└── utils
      ├ Utility1.js
      └ Utility2.js
      
`````
##### File architecture :
````javascript
class Utility1 {
	constructor(bot) {
    	this.foo() = function(bar){
        	return 'foo' + bar
        }
    }
    
    bot.module1.utility1 = this;
}

module.exports = Utility1
````

Then, the function can be used in a module (provided you have done the step 1.4).
````javascript
bot.module1.utilitary1.foo('bar')
````

### 1.4 State functions

The module class is injected with several function which are executed at different state of the app

#### setBot(bot) (may change later)

This function is ran after every modules and utilities are loaded, and is mainly used to overwrite the bot var with the one containing every utilities

````javascript
class Module1 {
	constructor(Discord, bot, Command) {
    	this.Discord = Discord
        this.bot = bot
        console.log(this.bot.module2.util) //Return 'undefined'
    }
    
    setBot(bot){
    	this.bot = bot
        console.log(this.bot.module2.util) //Return Util Class
        this.bot.module2.util = this.util
    }
}	

module.exports = Module1
````

### 1.5 Command creation

A command is made inside a module or submodule, and has 4 parameters
1. The way to write the command in discord
2. A description of the command
3. The arguments types
4. The process that is ran when the command is written

##### Example : 
````javascript
class Module1 {
	constructor(Discord, bot, Command) {...}
    setBot(bot){...}
    this.Command1 = new Command(
    	'<string>',
        'A command that returns what you said to you',
        [{type:'string'}],
        function(msg,arg){
        	msg.reply(arg[0]);
        }
    )
}	

module.exports = Module1
````

And then you can run it on discord your discord server : 
````
>Command1 test

bot says : test
````
