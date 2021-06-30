class Player {
    constructor() {
        this.index = null;
        this.x = 0;
        this.y = 0;
        this.name = null;
        this.score =0;
        this.color = null;
        //this.scale =1;
        this.w = 30;
        this.h = 30;
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            x:this.x,
            y:this.y,
            score:this.score,
            color:this.color,
            w:this.w,
            h:this.h
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    
}
