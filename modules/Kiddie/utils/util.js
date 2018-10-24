tinyText = require('tiny-text');

class Util {
    constructor(bot) {
        this.responses = [
            'lol ok',
            'cool',
            'no'
        ];
        this.timidResponses = [
            'sorry',
            'can i have borger pls',
            'im so sorry',
            'shut the up please'
        ];
        this.random = function (number) {
            return Math.floor((Math.random() * number) + 1);
        };
        this.saySomething = function () {
            if (this.random(10) > 8) {
                var tinyResponses = responses.concat(timidResponses);
            }
            //? To finish, adding zalgo text + emoji text
        };
        bot.kiddie.util = this;
    }
}

module.exports = Util;