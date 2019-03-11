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
import Module from "components/module";
export default class Module1 extends Module {
	constructor(Discord, bot, Command) {
    	super()
        this.config = {
            name: 'Module1',
            description: 'My first module!'
        };
    }
}
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
bot.module1.utility1.foo('bar')
````

### 1.4 Command creation

A command is made inside a module or submodule, and has 4 parameters
1. The way to write the command in discord
2. A description of the command
3. The arguments types
4. The process that is ran when the command is written

##### Example : 
````javascript
import Module from "components/module";
export default class Module1 extends Module {
    constructor() {...}
    this.Command1 = new Command(
    	'<string>',
        'My first command!',
        [{type:'string'}],
        function(msg,arg){
        	msg.reply(arg[0]);
        }
    )
}
````

And then you can run it on discord your discord server : 
````
>Command1 test

bot says : test
````
