function GameStatus(bot){
    
    this.showPartyPanel = function(partyPanel,format,game){
        partyPanel
            .setTitle(format.boldenedItalics(game.name))
            .setFooter('Party created by ' + game.leader.username)
            .setTimestamp()
            .setColor('LUMINOUS_VIVID_PINK');
        
        partyPanel.addField(
            game.playersList.length + '/' + game.maxPlayerNumber + ' players in the party',
            format.bolden('List of players : ' + this.showPlayersName(game)));
        
        return partyPanel;
    }

    this.showPlayersName = function(game){
        playerListDisplay = '';
        game.playersList.forEach(function(player,index,array){
            if(index === array.length - 1){
                playerListDisplay += player.username + '.';
            }else{
                playerListDisplay += player.username + ', ';
            }
        })

        return playerListDisplay;
    }

    bot.lgl.gameStatus = this;
}

module.exports = GameStatus;