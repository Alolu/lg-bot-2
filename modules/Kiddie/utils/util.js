tinyText = require('tiny-text');

function Util(bot){

    this.responses = [
        'tg',
        'lol ok',
        'cool',
        'pipi',
        'no'
    ];

    this.timidResponses = [
        'sorry',
        'can i have borger pls',
        'im so sorry',
        'shut the up please'
    ]

    this.random = function(number){
        return Math.floor((Math.random() * number) + 1);
    }

    this.saySomething = function(){
        if(this.random(10) > 8){
            tinyResponses = responses.concat(timidResponses);
        }

        //? To finish, adding zalgo text + emoji text
    }

    bot.kiddie.util = this;
}

module.exports = Util;