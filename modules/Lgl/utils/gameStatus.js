class GameStatus {
    constructor(bot) {
        this.checkIfPlayerCreatedAGame = function (gamesList, player) {
            game = gamesList.get(player);
            if (game) {
                return game;
            }
            return false;
        };
        this.checkIfPlayerJoinedAGame = function (gamesList, player) {
            if (gamesList.find(game => game.playersList.find(Player => Player == player))) {
                return true;
            }
            return false;
        };
        this.checkIfPlayerCanJoin = function (gamesList, player) {
            if (this.checkIfPlayerCreatedAGame(gamesList, player) || this.checkIfPlayerJoinedAGame(gamesList, player)) {
                return true;
            }
            return false;
        };
        this.checkIfGameExists = function (gamesList, name) {
            game = that.gamesList.find(game => game.name == name);
            if (game) {
                return game;
            }
            return false;
        };
        this.showPartyPanel = function (partyPanel, format, game) {
            partyPanel
                .setTitle(format.boldenedItalics(game.name))
                .setFooter('Party created by ' + game.leader.username)
                .setTimestamp()
                .setColor('LUMINOUS_VIVID_PINK');
            partyPanel.addField(game.playersList.length + '/' + game.maxPlayerNumber + ' players in the party', format.bolden('List of players : ' + this.showPlayersName(game)));
            return partyPanel;
        };
        this.showPlayersName = function (game) {
            playerListDisplay = '';
            game.playersList.forEach(function (player, index, array) {
                if (index === array.length - 1) {
                    playerListDisplay += player.username + '.';
                }
                else {
                    playerListDisplay += player.username + ', ';
                }
            });
            return playerListDisplay;
        };
        bot.lgl.gameStatus = this;
    }
}

module.exports = GameStatus;