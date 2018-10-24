class FontFormat {
    constructor(bot) {
        this.surlign = function (text) {
            var surlignedText = '__' + text + '__';
            return surlignedText;
        };
        this.italics = function (text) {
            var italics = '*' + text + '*';
            return italics;
        };
        this.bolden = function (text) {
            var boldenedText = '**' + text + '**';
            return boldenedText;
        };
        this.boldenedItalics = function (text) {
            var boldenedItalics = '***' + text + '***';
            return boldenedItalics;
        };
        this.code = function (text) {
            var codedText = "``` " + text + " ```";
            return codedText;
        };
        bot.core.format = this;
    }
}

module.exports = FontFormat;