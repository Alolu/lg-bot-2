class GameStatus {
    constructor(bot) {
        this.checkIfPlayerCreatedAGame = function (gamesList, player) {
            var game = gamesList.get(player);
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
            var game = gamesList.find(game => game.name == name);
            if (game) {
                return game;
            }
            return false;
        };
        this.showPartyPanel = function (partyPanel, format, game) {
            partyPanel
                .setTitle(format.surlign(format.bolden(game.name)))
                .setFooter('Party created by ' + game.leader.username)
                .setTimestamp()
                .setColor('LUMINOUS_VIVID_PINK');
            partyPanel.addField(
                format.italics(format.surlign('Player slots')),
                format.italics(game.playersList.length + '/' + game.maxPlayerNumber),
                true
            )
            partyPanel.addField(
                format.italics(format.surlign('Players')),
                format.italics(this.showPlayersName(game)),
                true
            )

            partyPanel.addField(
                format.italics(format.surlign('Composition')),
                this.showCompo(game,format),
                true
            )
            return partyPanel;
        };
        this.showPlayersName = function (game) {
            var playerListDisplay = '';
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
        bot.Lgl.gameStatus = this;
    }

    showCompo(game,format){
        var text = '';
        game.compo.forEach((quantity,role) => text += format.italics(quantity + ' ' + role.name + '.') + '\n')
        return text
    }
}

module.exports = GameStatus;