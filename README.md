# lg-bot-2
A modular discord bot, made during my free time. 

## 1. Module creation

### 1.1 File structure

You can start making a module by creating a folder named after your module, and making a `module.js` file inside.  

##### Exemple :
````
modules
├── module1
│   └── module.js
├── module2
│   └── module.js
...
`````

### 1.2 File in itself

A module file must contain a class that is exported with `module.exports` or the ES6 counterpart.  
Preferably, the class should be named after the module.  

Inside the class, you will be able to make Commands and use built-in state functions.

#### 

