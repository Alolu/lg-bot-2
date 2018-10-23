class FontFormat {
    constructor(bot) {
        this.surlign = function (text) {
            surlignedText = '__' + text + '__';
            return surlignedText;
        };
        this.italics = function (text) {
            italics = '*' + text + '*';
            return italics;
        };
        this.bolden = function (text) {
            boldenedText = '**' + text + '**';
            return boldenedText;
        };
        this.boldenedItalics = function (text) {
            boldenedItalics = '***' + text + '***';
            return boldenedItalics;
        };
        this.code = function (text) {
            codedText = "``` " + text + " ```";
            return codedText;
        };
        bot.core.format = this;
    }
}

module.exports = FontFormat;